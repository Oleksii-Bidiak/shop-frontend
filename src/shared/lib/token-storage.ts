import { SessionPayload } from '@/shared/types/auth';

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

const isBrowser = typeof window !== 'undefined';

export const loadTokens = (): { accessToken: string | null; refreshToken: string | null } => {
  if (!isBrowser) return { accessToken: null, refreshToken: null };

  return {
    accessToken: localStorage.getItem(ACCESS_KEY),
    refreshToken: localStorage.getItem(REFRESH_KEY)
  };
};

export const persistTokens = (payload: SessionPayload) => {
  if (!isBrowser) return;

  localStorage.setItem(ACCESS_KEY, payload.accessToken);
  localStorage.setItem(REFRESH_KEY, payload.refreshToken);
};

export const resetTokens = () => {
  if (!isBrowser) return;

  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};
