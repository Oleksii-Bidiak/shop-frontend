import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, SessionPayload } from '@/shared/types/auth';
import { loadTokens, persistTokens, resetTokens } from '@/shared/lib/token-storage';

const initialState: AuthState = {
  accessToken: loadTokens().accessToken,
  refreshToken: loadTokens().refreshToken,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      persistTokens(action.payload);
    },
    clearSession: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      resetTokens();
    }
  }
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
