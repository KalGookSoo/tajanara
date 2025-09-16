import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/shared/lib/state';

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

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  expiresIn: (() => {
    const item: string | null = localStorage.getItem('expiresIn');
    const isParsable = !!item && !Number.isNaN(item);
    return isParsable ? parseInt(item, 10) : null;
  })()
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state: AuthState, action: PayloadAction<SignInResponse>) {
      const { accessToken, refreshToken, expiresIn } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expiresIn = expiresIn;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('expiresIn', String(expiresIn));
    },
    signOut(state: AuthState) {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresIn = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiresIn');
    }
  }
});

export const { signIn, signOut } = authSlice.actions;

const decodeJwtPayload = (token: string): TokenPayload => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    return JSON.parse(json);
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
