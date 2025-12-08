import { Post } from '@/lib/client/api'
import {
  OrderResponse,
  OrderResponseSchema,
  CreateOrderInput,
  CreateOrderSchema,
} from '@/shared/schemas/order'

export async function submitOrder(
  data: CreateOrderInput
): Promise<OrderResponse> {
  const url = '/api/orders'

  const response = await Post(url, data, CreateOrderSchema, OrderResponseSchema)

  return response
}

// export async function changeOrderStatus(
//   orderId: string,
//   status: UpdateOrderStatusInput
// ): Promise<OrderResponse> {
//   const url = `/api/orders/${orderId}`

//   const response = await Patch(url, status, UpdateOrderStatusSchema)

//   return response
// }
