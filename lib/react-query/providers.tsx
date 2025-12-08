'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from './queryClient'

type ReactQueryProviderProps = {
  children: ReactNode
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
