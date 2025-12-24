import dbConnect from '@/lib/db'
import { FilterQuery, Types } from 'mongoose'
import OrderModel from '@/lib/server/models/Order'
import { OrderStatus, TableNumber } from '@/config/index'
import {
  CreateOrderInput,
  OrderResponse,
  toOrderResponse,
} from '@/shared/schemas/order'
import SessionModel from '../models/Session'

export type GetOrdersFilter = {
  sessionId?: string
  status?: OrderStatus
}

export async function getOrders(
  filter: GetOrdersFilter = {}
): Promise<OrderResponse[]> {
  const { sessionId, status } = filter

  const query: FilterQuery<GetOrdersFilter> = {}

  if (sessionId) query.sessionId = sessionId
  if (status) query.status = status

  await dbConnect()

  const orders = await OrderModel.find(filter).lean()
  const parsed = orders
    .map(toOrderResponse)
    .filter((order): order is OrderResponse => order !== null)

  return parsed
}

export async function getOrdersByTableNumber(tableNumber: TableNumber) {
  await dbConnect()

  const orders = await OrderModel.find({ tableNumber: tableNumber })
  const parsed = orders.map(toOrderResponse)

  return parsed
}

export async function createOrder(
  data: CreateOrderInput
): Promise<OrderResponse> {
  await dbConnect()

  const { items, sessionId } = data

  const session = await SessionModel.findById(sessionId).exec()

  if (!session) {
    throw new Error('Session not found.')
  }

  if (session.status !== 'open') {
    throw new Error(
      `Cannot place order. Session ${sessionId} is ${session.status}.`
    )
  }

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const doc = await OrderModel.create({
    sessionId: sessionId,
    tableNumber: session.tableNumber,
    status: 'preparing',
    total: totalPrice,
    items: items.map(({ menuItemId, ...rest }) => ({
      menuItem: new Types.ObjectId(menuItemId),
      ...rest,
    })),
  })

  const res = toOrderResponse(doc)

  if (!res) {
    throw new Error('Failed to create order')
  }

  return res
}
