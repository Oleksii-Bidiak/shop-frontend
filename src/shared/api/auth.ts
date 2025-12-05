import { apiClient } from '@/shared/api/client';
import { restContract } from '@/shared/api/contracts';
import { SessionPayload } from '@/shared/types/auth';

export const login = async (email: string, password: string): Promise<SessionPayload> =>
  apiClient.post<SessionPayload, { email: string; password: string }>(
    restContract.auth.login.path,
    { email, password }
  );

export const fetchSession = async (): Promise<SessionPayload> =>
  apiClient.get<SessionPayload>(restContract.auth.session.path);
