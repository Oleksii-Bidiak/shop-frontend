import { AxiosRequestConfig } from 'axios';

import { axiosInstance } from './axios-instance';
import { GraphqlOperation } from './contracts';
import { ApiError } from './errors';

const unwrap = <T>(promise: Promise<{ data: T }>) => promise.then((response) => response.data);

interface GraphqlResponse<T> {
  data: T;
  errors?: { message: string }[];
}

export const apiClient = {
  get: <TResponse>(path: string, config?: AxiosRequestConfig) =>
    unwrap<TResponse>(axiosInstance.get<TResponse>(path, config)),
  post: <TResponse, TBody = unknown>(path: string, body: TBody, config?: AxiosRequestConfig) =>
    unwrap<TResponse>(axiosInstance.post<TResponse>(path, body, config)),
  patch: <TResponse, TBody = unknown>(path: string, body: TBody, config?: AxiosRequestConfig) =>
    unwrap<TResponse>(axiosInstance.patch<TResponse>(path, body, config)),
  delete: <TResponse>(path: string, config?: AxiosRequestConfig) =>
    unwrap<TResponse>(axiosInstance.delete<TResponse>(path, config)),
  graphql: <TResponse, TVariables = Record<string, unknown>>(
    operation: GraphqlOperation<TVariables, TResponse>,
    variables?: TVariables
  ) =>
    unwrap<GraphqlResponse<TResponse>>(
      axiosInstance.post<GraphqlResponse<TResponse>>('/graphql', {
        operationName: operation.operationName,
        query: operation.query,
        variables: variables ?? {}
      })
    ).then((payload) => {
      if (payload.errors?.length) {
        throw new ApiError({
          message: payload.errors.map((error) => error.message).join(', '),
          details: payload.errors
        });
      }

      return payload.data;
    })
};
