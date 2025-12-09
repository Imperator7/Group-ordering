'use client'

import { CartItem } from '../../../hooks/useCart'
import CartItemCard from './CartItemCard'
import EmptyCart from './EmptyCart'

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
  cart: CartItem[]
  addOne: (id: string) => void
  removeOne: (id: string) => void
  removeItem: (id: string) => void
  openCart: () => void
  confirmOrder: (sessionId: string) => void
  getOrderedCount: (menuItemId: string) => number
  sessionId: string
}

const OrderCart = ({
  cart,
  addOne,
  removeOne,
  removeItem,
  openCart,
  confirmOrder,
  getOrderedCount,
  sessionId,
}: OrderCartProps) => {
  return (
    <div className="my-2">
      <h1 className="font-bold">ตะกร้าสินค้า</h1>
      <div className="p-4">
        {cart.length === 0 ? (
          <EmptyCart openCart={openCart} />
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
      <div className="px-4 py-2">
        <button
          className="bg-blue-900 text-white font-medium w-full rounded py-2"
          onClick={() => sessionId && confirmOrder(sessionId)}
        >
          ยืนยันออเดอร์
        </button>
      </div>
    </div>
  )
}
export default OrderCart
