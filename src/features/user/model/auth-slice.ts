import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, SessionPayload } from '@/shared/types/auth';
import { loadSession, persistTokens, resetTokens } from '@/shared/lib/token-storage';

const session = loadSession();

const initialState: AuthState = {
  accessToken: session.accessToken,
  refreshToken: session.refreshToken,
  user: session.user,
  status: session.accessToken ? 'authenticated' : 'anonymous'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.status = 'authenticated';
      persistTokens(action.payload);
    },
    setRefreshing: (state) => {
      state.status = 'refreshing';
    },
    clearSession: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.status = 'anonymous';
      resetTokens();
    }
  }
});

export const { setSession, clearSession, setRefreshing } = authSlice.actions;
export default authSlice.reducer;
