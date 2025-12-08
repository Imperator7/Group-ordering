import dbConnect from '@/lib/db'
import { FilterQuery, Types } from 'mongoose'
import OrderModel from '@/lib/server/models/Order'
import { OrderStatus } from '@/config/index'
import {
  CreateOrderInput,
  OrderResponse,
  toOrderResponse,
} from '@/shared/schemas/order'

export type GetOrdersFilter = {
  tableNumber?: string
  status?: OrderStatus
}

export async function getOrders(
  filter: GetOrdersFilter = {}
): Promise<OrderResponse[]> {
  const { tableNumber, status } = filter

  const query: FilterQuery<GetOrdersFilter> = {}

  if (tableNumber) query.tableNumber = tableNumber
  if (status) query.status = status

  await dbConnect()

  const orders = await OrderModel.find(filter).lean()
  const parsed = orders.map(toOrderResponse)

  return parsed
}

export async function getOrdersByTableId(tableId: string) {
  console.log('waiting for implementation')
}

export async function createOrder(
  data: CreateOrderInput
): Promise<OrderResponse> {
  await dbConnect()

  const { items, tableNumber } = data

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const doc = await OrderModel.create({
    tableNumber: tableNumber,
    status: 'pending',
    total: totalPrice,
    items: items.map(({ menuItemId, ...rest }) => ({
      menuItem: new Types.ObjectId(menuItemId),
      ...rest,
    })),
  })

  const res = toOrderResponse(doc)

  return res
}
