'use client'

import { OrderResponse } from '@/shared/schemas/order'
import { timeSince } from '@/lib/helper'

type OrderListProps = {
  orders: OrderResponse[]
}
const OrderList = ({ orders }: OrderListProps) => {
  const statusColors = {
    preparing: 'bg-blue-100 text-blue-800 border-blue-300',
    ready: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    served: 'bg-green-100 text-green-800 border-green-300',
    cancelled: 'bg-gray-100 text-gray-800 border-gray-300',
  }

  const statusLabels = {
    preparing: '👨‍🍳 Preparing',
    ready: '✨ Ready',
    served: '✓ Served',
    cancelled: '✕ Cancelled',
  }

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 p-4 gap-4 max-w-[1200px]">
      {orders.map((order) => (
        <li
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          key={order.id}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white font-bold text-lg px-3 py-1 rounded">
                โต๊ะ {order.tableNumber}
              </div>
              <button
                disabled={
                  order.status === 'served' || order.status === 'cancelled'
                }
                className={`px-3 py-1 rounded-full text-sm font-medium border ${
                  statusColors[order.status]
                } ${
                  order.status !== 'served' && order.status !== 'cancelled'
                    ? 'cursor-pointer hover:opacity-80'
                    : 'cursor-default'
                }`}
              >
                {statusLabels[order.status]}
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {timeSince(order.createdAt)}
            </div>
          </div>

          <div className="space-y-2 mb-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">
                      {item.quantity}x
                    </span>
                    <span className="font-medium text-gray-900">
                      {item.name}
                    </span>
                  </div>
                  {item.note && (
                    <div className="ml-8 text-sm text-orange-600 italic mt-1">
                      📝 {item.note}
                    </div>
                  )}
                </div>
                <span className="text-gray-700 font-medium ml-4">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
            </div>
            <div className="text-lg font-bold text-gray-900">
              Total: ${order.total.toFixed(2)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
export default OrderList
