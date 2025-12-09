import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Get } from '@/lib/client/api'
import z from 'zod'
import { OrderResponse, OrderResponseSchema } from '@/shared/schemas/order'

async function fetchOrders(sessionId: string): Promise<OrderResponse[]> {
  const res = await Get(
    `/api/orders?sessionId=${sessionId}`,
    z.array(OrderResponseSchema)
  )

  return res
}

export function useOrders(sessionId: string) {
  const query = useQuery({
    queryKey: ['orders', sessionId],
    queryFn: () => fetchOrders(sessionId!),
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
