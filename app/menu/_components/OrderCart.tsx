'use client'

import { CartItem } from '../../../hooks/useCart'
import { useCartContext } from '@/contexts/CartContext'
import CartItemCard from './CartItemCard'
import EmptyCart from './EmptyCart'
import { useSubmitOrder } from '@/hooks/useOrder'

type CartListProps = {
  cart: CartItem[]
  addOne: (id: string) => void
  removeOne: (id: string) => void
  removeItem: (id: string) => void
  getOrderedCount: (menuItemId: string) => number
}

const CartList = ({
  cart,
  addOne,
  removeOne,
  removeItem,
  getOrderedCount,
}: CartListProps) => (
  <div className="space-y-2">
    {cart.map((cartItem) => (
      <CartItemCard
        key={`cart-${cartItem.id}`}
        cartItem={cartItem}
        operation={{
          addOne: addOne,
          removeOne: removeOne,
          removeItem: removeItem,
        }}
        orderedCount={getOrderedCount(cartItem.id)}
      />
    ))}
  </div>
)

type OrderCartProps = {
  openCart: () => void
  getOrderedCount: (menuItemId: string) => number
  sessionId: string
}

const OrderCart = ({ getOrderedCount, sessionId }: OrderCartProps) => {
  const { cart, addOne, removeOne, removeItem, clearCart } = useCartContext()
  const { mutate: submitOrder, isPending } = useSubmitOrder(sessionId)

  const handleSubmit = () => {
    if (cart.length === 0) return

    submitOrder(
      {
        sessionId,
        items: cart.map((item) => ({
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      { onSuccess: () => clearCart() }
    )
  }

  return (
    <div className="my-2">
      <h1 className="font-bold">ตะกร้าสินค้า</h1>
      <div className="p-4">
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <CartList
            cart={cart}
            addOne={addOne}
            removeOne={removeOne}
            removeItem={removeItem}
            getOrderedCount={getOrderedCount}
          />
        )}
      </div>
      <button
        className="bg-blue-900 text-white font-medium w-full rounded py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        onClick={() => sessionId && handleSubmit()}
        disabled={isPending}
      >
        {isPending && (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {isPending ? 'กำลังส่ง...' : 'ยืนยันออเดอร์'}
      </button>
    </div>
  )
}
export default OrderCart
