import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/model/auth-slice';
import cartReducer from '@/features/cart/model/cart-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
