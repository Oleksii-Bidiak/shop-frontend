import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Cart, CartItem } from '@/entities/cart';

export interface CartState {
  id?: string;
  userId?: string;
  items: CartItem[];
  totalPrice: number;
  currency: Cart['currency'];
  status: 'idle' | 'loading' | 'error';
  updatedAt?: string;
}

const recalculate = (state: CartState) => {
  state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  state.updatedAt = new Date().toISOString();
};

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  currency: 'UAH',
  status: 'idle'
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart | (CartState & { items: CartItem[] })>) => {
      const { id, items, totalPrice, currency, updatedAt, userId } = action.payload;
      state.id = id ?? state.id ?? 'local-cart';
      state.userId = userId ?? state.userId;
      state.items = items;
      state.currency = currency ?? state.currency;
      state.totalPrice = totalPrice ?? items.reduce((total, item) => total + item.price * item.quantity, 0);
      state.updatedAt = updatedAt ?? new Date().toISOString();
      state.status = 'idle';
    },
    setStatus: (state, action: PayloadAction<CartState['status']>) => {
      state.status = action.payload;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((item) => item.productId === action.payload.productId);

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      recalculate(state);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find((entry) => entry.productId === action.payload.productId);
      if (!item) return;

      item.quantity = action.payload.quantity;
      recalculate(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
      recalculate(state);
    },
    clearCart: (state) => {
      state.items = [];
      recalculate(state);
    }
  }
});

export const { setCart, addItem, removeItem, updateQuantity, clearCart, setStatus } =
  cartSlice.actions;
export default cartSlice.reducer;
