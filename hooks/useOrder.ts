import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import {
  fetchOrders,
  fetchOrdersBySession,
  submitOrder,
} from '@/lib/client/services/orders'
import { toast } from 'sonner'
import { ApiError } from '@/lib/client/api'

export const orderKeys = {
  all: ['orders'] as const,
  session: (id: string) => [...orderKeys.all, id] as const,
}

export function useOrder() {
  const query = useQuery({
    queryKey: orderKeys.all,
    queryFn: () => fetchOrders(),
    refetchInterval: 3000,
  })

  return {
    ...query,
  }
}

export function useOrderBySessionId(sessionId: string) {
  const query = useQuery({
    queryKey: orderKeys.session(sessionId),
    queryFn: () => fetchOrdersBySession(sessionId),
    enabled: !!sessionId,
    refetchInterval: 3000,
  })

  const orderedItemCounts = useMemo(() => {
    const counts = new Map<string, number>()

    for (const order of query.data ?? []) {
      for (const item of order.items) {
        const current = counts.get(item.menuItemId) ?? 0
        counts.set(item.menuItemId, current + item.quantity)
      }
    }

    return counts
  }, [query.data])

  const getOrderedCount = (menuItemId: string) =>
    orderedItemCounts.get(menuItemId) ?? 0

  return {
    ...query,
    orderedItemCounts,
    getOrderedCount,
  }
}

export function useSubmitOrder(sessionId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: submitOrder,
    onSuccess: async () => {
      toast.success('Order sent to kitchen!')

      await queryClient.invalidateQueries({
        queryKey: orderKeys.session(sessionId),
      })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    },
  })
}
