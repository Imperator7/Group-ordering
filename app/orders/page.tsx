import { getOrders, type GetOrdersFilter } from '@/lib/server/services/order'
import OrderList from './_components/OrderList'
import { OrderResponse } from '@/shared/schemas/order'

type OrdersPageProps = {
  searchParams: GetOrdersFilter
}

const page = async ({ searchParams }: OrdersPageProps) => {
  const orders: OrderResponse[] = await getOrders(await searchParams)

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="text-sm text-slate-500 mt-1">
            {orders.length} active order{orders.length !== 1 ? 's' : ''}
          </p>
        </header>
        <OrderList orders={orders} />
      </div>
    </main>
  )
}

export default page
