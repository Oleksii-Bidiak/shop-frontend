export interface User {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'customer';
}

export interface SessionPayload {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  status: 'anonymous' | 'authenticated' | 'refreshing';
}
