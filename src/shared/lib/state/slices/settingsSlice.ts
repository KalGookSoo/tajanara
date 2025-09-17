import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/shared/lib/state'

export type SettingsState = {
  language: 'ko' | 'en'
  font: string
  soundEnabled: boolean
}

const STORAGE_KEY = 'tj-settings'

const getInitialState = (): SettingsState => {
  const base: SettingsState = { language: 'ko', font: 'system-ui', soundEnabled: true }
  if (typeof window === 'undefined') return base
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return base
    const parsed = JSON.parse(raw) as Partial<SettingsState>
    return {
      language: (parsed.language ?? base.language) as SettingsState['language'],
      font: parsed.font ?? base.font,
      soundEnabled: parsed.soundEnabled ?? base.soundEnabled,
    }
  } catch {
    return base
  }
}

const initialState: SettingsState = getInitialState()

const persist = (state: SettingsState) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<'ko' | 'en'>) {
      state.language = action.payload
      persist(state)
    },
    setFont(state, action: PayloadAction<string>) {
      state.font = action.payload
      persist(state)
    },
    setSoundEnabled(state, action: PayloadAction<boolean>) {
      state.soundEnabled = action.payload
      persist(state)
    },
    toggleSoundEnabled(state) {
      state.soundEnabled = !state.soundEnabled
      persist(state)
    },
    hydrateFromStorage(state) {
      // idempotent hydration in client env
      const next = getInitialState()
      state.language = next.language
      state.font = next.font
      state.soundEnabled = next.soundEnabled
    },
  },
})

export const { setLanguage, setFont, setSoundEnabled, toggleSoundEnabled, hydrateFromStorage } = settingsSlice.actions

export const selectSettings = (state: RootState) => state.settings
export const selectLanguage = (state: RootState) => state.settings.language
export const selectFont = (state: RootState) => state.settings.font
export const selectSoundEnabled = (state: RootState) => state.settings.soundEnabled

export default settingsSlice.reducer
