import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/shared/lib/state';
import { decodeBase64Json } from '@/shared/lib/encoding';

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
};

export type TokenPayload = {
  sub: string;
  username: string;
  authorities: string[];
  iat?: number; // 발급 시각 (초 단위 UNIX 시간)
  exp?: number; // 만료 시각 (초 단위 UNIX 시간)
  [key: string]: unknown;
} | null;

const getInitialState = (): AuthState => {
  const base: AuthState = { accessToken: null, refreshToken: null, expiresIn: null };
  if (typeof window === 'undefined') return base; // SSR/Edge: don't touch localStorage
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const rawExpires = localStorage.getItem('expiresIn');
    const n = rawExpires != null ? Number(rawExpires) : NaN;
    const expiresIn = Number.isFinite(n) ? n : null;
    return { accessToken, refreshToken, expiresIn };
  } catch {
    return base;
  }
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state: AuthState, action: PayloadAction<SignInResponse>) {
      const { accessToken, refreshToken, expiresIn } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expiresIn = expiresIn;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('expiresIn', String(expiresIn));
        } catch {}
      }
    },
    signOut(state: AuthState) {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresIn = null;
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('expiresIn');
        } catch {}
      }
    }
  }
});

export const { signIn, signOut } = authSlice.actions;

const decodeJwtPayload = (token: string): TokenPayload => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = decodeBase64Json<Record<string, unknown>>(base64);
    return (payload ?? null) as TokenPayload;
  } catch {
    return null;
  }
};

// 통합 셀렉터: 토큰 페이로드를 한 번만 디코딩하고 사용처에서는 구조 분해로 활용
export const selectTokenPayload = createSelector(
  (state: RootState) => state.auth.accessToken,
  (accessToken): TokenPayload => {
    if (!accessToken) return null;
    return decodeJwtPayload(accessToken);
  }
);

export const selectIsAuthenticated = (state: RootState): boolean => {
  const payload = selectTokenPayload(state);
  if (!payload) return false;
  const nowSec = Math.floor(Date.now() / 1000);
  // exp가 존재하고 현재 시간보다 과거라면 만료된 토큰으로 간주
  if (typeof payload.exp === 'number' && payload.exp <= nowSec) {
    return false;
  }
  // 선택 사항: iat가 현재 시간보다 미래라면 아직 유효하지 않은 토큰으로 간주
  return !(typeof payload.iat === 'number' && payload.iat > nowSec);
};

export default authSlice.reducer;
