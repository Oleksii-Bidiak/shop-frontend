import { User as SessionUser } from '@/shared/types/auth';

export type UserRole = SessionUser['role'];

export interface User extends SessionUser {
  fullName?: string;
  avatarUrl?: string;
  phone?: string;
}
