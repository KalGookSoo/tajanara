import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/shared/lib/state/slices/authSlice';
import settingsReducer from '@/shared/lib/state/slices/settingsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
