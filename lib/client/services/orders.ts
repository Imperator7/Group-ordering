import { Get, Post } from '@/lib/client/api'
import {
  OrderResponse,
  OrderResponseSchema,
  CreateOrderInput,
  CreateOrderSchema,
} from '@/shared/schemas/order'
import z from 'zod'

export async function fetchOrders(): Promise<OrderResponse[]> {
  const res = await Get(`/api/orders`, z.array(OrderResponseSchema))

  return res
}

export async function fetchOrdersBySession(
  sessionId?: string
): Promise<OrderResponse[]> {
  const res = await Get(
    `/api/orders?sessionId=${sessionId}`,
    z.array(OrderResponseSchema)
  )

  return res
}

export async function submitOrder(
  data: CreateOrderInput
): Promise<OrderResponse> {
  const url = '/api/orders'

  const response = await Post(url, data, CreateOrderSchema, OrderResponseSchema)

  return response
}
