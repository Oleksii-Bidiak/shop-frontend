import { SessionPayload } from '@/shared/types/auth';

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const USER_KEY = 'session_user';

const isBrowser = typeof window !== 'undefined';

const parseUser = (userJson: string | null): SessionPayload['user'] | null => {
  if (!userJson) return null;

  try {
    return JSON.parse(userJson) as SessionPayload['user'];
  } catch (error) {
    console.warn('Failed to parse stored user', error);
    return null;
  }
};

export const loadSession = (): {
  accessToken: string | null;
  refreshToken: string | null;
  user: SessionPayload['user'] | null;
} => {
  if (!isBrowser) return { accessToken: null, refreshToken: null, user: null };

  return {
    accessToken: localStorage.getItem(ACCESS_KEY),
    refreshToken: localStorage.getItem(REFRESH_KEY),
    user: parseUser(localStorage.getItem(USER_KEY))
  };
};

export const loadTokens = (): { accessToken: string | null; refreshToken: string | null } => {
  const session = loadSession();

  return { accessToken: session.accessToken, refreshToken: session.refreshToken };
};

export const persistTokens = (payload: SessionPayload) => {
  if (!isBrowser) return;

  localStorage.setItem(ACCESS_KEY, payload.accessToken);
  localStorage.setItem(REFRESH_KEY, payload.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
};

export const resetTokens = () => {
  if (!isBrowser) return;

  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
};
