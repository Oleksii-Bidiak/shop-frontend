import { axiosInstance } from '@/shared/api/axios-instance';
import { SessionPayload } from '@/shared/types/auth';

export const login = async (email: string, password: string): Promise<SessionPayload> => {
  const { data } = await axiosInstance.post<SessionPayload>('/auth/login', { email, password });
  return data;
};
