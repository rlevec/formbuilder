import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import type { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";


type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type CustomFetchParams<TBody = unknown> = {
  url: string;
  options?: {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: TBody;
  };
};

export const customFetch = async <TResponse = unknown, TBody = unknown>({
  url,
  options = {},
}: CustomFetchParams<TBody>): Promise<TResponse> => {
  const method = (options.method || "GET").toUpperCase();

  const headers: Record<string, string> = {
    ...(options.headers || {}),
  };

  const config: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (options.body && !["GET", "HEAD"].includes(method)) {
    if (options.body instanceof FormData) {
      config.body = options.body;
    } else {
      headers["Content-Type"] = "application/json";
      console.log("REQUEST BODY OBJECT", options.body);
console.log("REQUEST BODY JSON", JSON.stringify(options.body));
      config.body = JSON.stringify(options.body);
    }
  }

  const response = await fetch(url, config);

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      throw {
        message: data?.message || "Request failed",
        status: response.status,
        data,
      };
    }

    throw {
      message: data?.message || "Request failed",
      status: response.status,
      data,
    };
  }

  return data as TResponse;
};

type UseCustomQueryParams<TResponse> = {
  key: string;
  fetchParams: CustomFetchParams;
  queryParams?: Record<string, string | number | boolean>;
  options?: Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">;
};

export const useCustomQuery = <TResponse = unknown>({
  key,
  fetchParams,
  queryParams = {},
  options = {},
}: UseCustomQueryParams<TResponse>) => {
  return useQuery<TResponse>({
    queryKey: [key, queryParams],

    queryFn: () =>
      customFetch<TResponse>({
        ...fetchParams,
        url: `${fetchParams.url}?${new URLSearchParams(
          queryParams as Record<string, string>,
        )}`,
      }),

    staleTime: options.staleTime ?? 1000 * 60,
    gcTime: options.gcTime ?? 1000 * 60 * 5,

    ...options,
  });
};

type MutationCallbacks<TData, TError, TBody> = {
  key?: string;

  onSuccess?: (data: TData, variables: TBody) => void;

  onError?: (error: TError, variables: TBody) => void;
};

type UseCustomMutationParams<
  TData = unknown,
  TBody = unknown,
  TError = unknown,
  TContext = unknown,
> = {
  fetchParams: CustomFetchParams<TBody>;
  options?: MutationCallbacks<TData, TError, TBody> &
    Omit<
      UseMutationOptions<TData, TError, TBody, TContext>,
      "onSuccess" | "onError"
    >;
};

export const useCustomMutation = <
  TData = unknown,
  TBody = unknown,
  TError = unknown,
  TContext = unknown,
>({
  fetchParams,
  options,
}: UseCustomMutationParams<TData, TBody, TError, TContext>) => {
  const queryClient = useQueryClient();

  const { key, onSuccess, onError, ...mutationOptions } = options || {};

  return useMutation<TData, TError, TBody, TContext>({
    ...mutationOptions,

    mutationFn: async (variables: TBody) => {
      return customFetch<TData, TBody>({
        ...fetchParams,
        options: {
          ...fetchParams.options,
          body: variables,
        },
      });
    },

    onSuccess: (data, variables) => {
      if (key) {
        queryClient.invalidateQueries({
          queryKey: [key],
        });
      }

      onSuccess?.(data, variables);
    },

    onError: (error, variables) => {
      onError?.(error, variables);
    },
  });
};