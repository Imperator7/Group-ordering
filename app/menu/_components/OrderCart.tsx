'use client'

import { useSearchParams } from 'next/navigation'
import { CartItem } from '../hooks/useCart'
import CartItemCard from './CartItemCard'
import EmptyCart from './EmptyCart'

type CartListProps = {
  cart: CartItem[]
  addOne: (id: string) => void
  removeOne: (id: string) => void
  removeItem: (id: string) => void
}

const CartList = ({ cart, addOne, removeOne, removeItem }: CartListProps) => (
  <div className="space-y-2">
    {cart.map((cartItem) => (
      <CartItemCard
        key={`cart-${cartItem.name}`}
        cartItem={cartItem}
        operation={{
          addOne: addOne,
          removeOne: removeOne,
          removeItem: removeItem,
        }}
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
}

const OrderCart = ({
  cart,
  addOne,
  removeOne,
  removeItem,
  openCart,
  confirmOrder,
}: OrderCartProps) => {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('sessionId')

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
