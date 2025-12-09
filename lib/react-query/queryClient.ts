'use client'

import { QueryClient } from '@tanstack/react-query'

let queryClient: QueryClient | null = null

export function getQueryClient() {
  if (typeof window === 'undefined') {
    return new QueryClient()
  }

  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: true,
          retry: 1,
          staleTime: 1000 * 30,
        },
      },
    })
  }

  return queryClient
}
