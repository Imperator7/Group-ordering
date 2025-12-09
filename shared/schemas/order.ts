import { z } from 'zod'
import { Types } from 'mongoose'
import { OrderStatusSchema } from '@/shared/schemas/common'

export const OrderItemSchema = z.object({
  menuItemId: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
  note: z.string().max(200).optional(),
})
export type OrderItem = z.infer<typeof OrderItemSchema>

export const OrderSchema = z.object({
  sessionId: z.string().min(1),
  tableNumber: z.string().min(1),
  status: OrderStatusSchema,
  items: z.array(OrderItemSchema).min(1),
  total: z.number().nonnegative(),
})

export type Order = z.infer<typeof OrderSchema>

export const CreateOrderSchema = OrderSchema.omit({
  status: true,
  total: true,
  tableNumber: true,
})
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>

export const UpdateOrderStatusSchema = OrderSchema.pick({ status: true })
export type UpdateOrderStatusInput = z.infer<typeof UpdateOrderStatusSchema>

export const OrderResponseSchema = OrderSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type OrderResponse = z.infer<typeof OrderResponseSchema>

export interface IOrderItemDb extends Omit<OrderItem, 'menuItemId'> {
  menuItem: Types.ObjectId
}

export interface IOrderDb extends Omit<Order, 'items' | 'sessionId'> {
  _id: Types.ObjectId
  sessionId: Types.ObjectId
  items: IOrderItemDb[]
  createdAt: Date
  updatedAt: Date
}

export function toOrderResponse(doc: IOrderDb): OrderResponse | null {
  try {
    return {
      id: doc._id?.toString() ?? '',
      sessionId: doc.sessionId?.toString() ?? null,
      tableNumber: doc.tableNumber ?? '',
      status: doc.status ?? 'preparing',
      items: (doc.items ?? []).map((item) => ({
        menuItemId: item.menuItem?.toString() ?? '',
        name: item.name ?? '',
        price: item.price ?? 0,
        quantity: item.quantity ?? 0,
        note: item.note,
      })),
      total: doc.total ?? 0,
      createdAt: doc.createdAt?.toISOString() ?? null,
      updatedAt: doc.updatedAt?.toISOString() ?? null,
    }
  } catch (err) {
    console.error('Failed to map order:', doc._id, err)
    return null
  }
}
// export function toOrderResponse(doc: IOrderDb): OrderResponse | null {
//   return {
//     id: doc._id.toString(),
//     sessionId: doc.sessionId.toString(),
//     tableNumber: doc.tableNumber,
//     status: doc.status,
//     items: doc.items.map((item) => ({
//       menuItemId: item.menuItem.toString(),
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity,
//       note: item.note,
//     })),
//     total: doc.total,
//     createdAt: doc.createdAt.toISOString(),
//     updatedAt: doc.updatedAt.toISOString(),
//   }
// }
