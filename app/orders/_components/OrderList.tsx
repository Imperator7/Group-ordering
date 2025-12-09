'use client'

import { OrderResponse } from '@/shared/schemas/order'
import { timeSince } from '@/lib/helper'

type OrderListProps = {
  orders: OrderResponse[]
}

const OrderList = ({ orders }: OrderListProps) => {
  const statusConfig = {
    preparing: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      label: 'Preparing',
    },
    ready: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
      label: 'Ready',
    },
    served: {
      bg: 'bg-slate-50',
      text: 'text-slate-500',
      border: 'border-slate-200',
      dot: 'bg-slate-400',
      label: 'Served',
    },
    cancelled: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-200',
      dot: 'bg-red-400',
      label: 'Cancelled',
    },
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <svg
          className="w-16 h-16 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-lg font-medium">No orders yet</p>
        <p className="text-sm">Orders will appear here when placed</p>
      </div>
    )
  }

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {orders.map((order) => {
        const status = statusConfig[order.status]
        const isInactive =
          order.status === 'served' || order.status === 'cancelled'

        return (
          <li
            key={order.id}
            className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
              isInactive ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="bg-slate-900 text-white font-bold text-sm px-2.5 py-1 rounded-md">
                  #{order.tableNumber}
                </span>
                <button
                  disabled={isInactive}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    status.bg
                  } ${status.text} ${status.border} ${
                    !isInactive ? 'cursor-pointer hover:brightness-95' : ''
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </button>
              </div>
              <time className="text-xs text-slate-400 font-medium">
                {timeSince(order.createdAt)}
              </time>
            </div>

            <div className="px-4 py-3 space-y-2.5">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 bg-slate-100 text-slate-600 text-xs font-semibold w-6 h-6 rounded flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <span className="font-medium text-slate-800 truncate">
                        {item.name}
                      </span>
                    </div>
                    {item.note && (
                      <p className="ml-8 text-xs text-amber-600 mt-1 truncate">
                        Note: {item.note}
                      </p>
                    )}
                  </div>
                  <span className="text-slate-600 text-sm font-medium tabular-nums">
                    ฿{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-slate-100">
              <span className="text-xs text-slate-400">
                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
              </span>
              <span className="text-base font-bold text-slate-900">
                ฿{order.total.toFixed(2)}
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default OrderList
