import { getOrders, type GetOrdersFilter } from '@/lib/server/services/order'
import OrderList from './_components/OrderList'
import { Order } from '@/shared/schemas/order'

type OrdersPageProps = {
  searchParams: GetOrdersFilter
}

const page = async ({ searchParams }: OrdersPageProps) => {
  const orders: Order[] = await getOrders(await searchParams)

  return (
    <div className="p-4">
      <p className="font-bold text-3xl">Orders</p>
      <OrderList orders={orders} />
    </div>
  )
}
export default page
