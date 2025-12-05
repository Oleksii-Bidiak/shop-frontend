import { AxiosError } from 'axios';

export interface ApiErrorPayload {
  status?: number;
  message: string;
  details?: unknown;
  cause?: unknown;
}

export class ApiError extends Error {
  status?: number;
  details?: unknown;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = 'ApiError';
    this.status = payload.status;
    this.details = payload.details;

    if (payload.cause) {
      this.cause = payload.cause;
    }
  }
}

const extractMessage = (error: AxiosError) => {
  const apiMessage =
    (error.response?.data as { message?: string } | undefined)?.message || error.message;

  return apiMessage || 'Сталася невідома помилка';
};

export const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error;

  if (error instanceof AxiosError) {
    return new ApiError({
      status: error.response?.status,
      message: extractMessage(error),
      details: error.response?.data,
      cause: error
    });
  }

  return new ApiError({ message: 'Невідома помилка запиту', details: error });
};
