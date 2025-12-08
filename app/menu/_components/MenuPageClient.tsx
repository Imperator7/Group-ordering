'use client'
import { MenuItemResponse } from '@/shared/schemas/menuItem'
import { useCart } from '../hooks/useCart'
import Menu from './Menu'
import OrderCart from './OrderCart'
import { useState } from 'react'

type MenuPageClientProps = {
  menuItems: MenuItemResponse[]
}

const MenuPageClient = ({ menuItems }: MenuPageClientProps) => {
  const {
    cart,
    addItemOne,
    removeItemOne,
    removeItem,
    confirmOrder,
    totalItems,
  } = useCart({ menuItems })

  const [showCart, setShowCart] = useState<boolean>(false)

  const openCart = () => setShowCart(true)
  const closeCart = () => setShowCart(false)

  return (
    <>
      <div className="pb-24">
        <Menu
          menu={menuItems}
          addCartOne={addItemOne}
          openCart={openCart}
          cartLength={totalItems.toString()}
        />
      </div>

      <div
        className={`fixed inset-0 z-50 flex justify-center pointer-events-none`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out pointer-events-auto ${
            showCart ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={closeCart}
        />

        <div
          className={`absolute bottom-0 w-full max-w-md bg-white rounded-t-2xl shadow-2xl pointer-events-auto transition-transform duration-300 ease-out transform flex flex-col max-h-[90vh] ${
            showCart ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex justify-center p-2" onClick={closeCart}>
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          <div className="overflow-y-auto p-4">
            <OrderCart
              cart={cart}
              addOne={addItemOne}
              removeOne={removeItemOne}
              removeItem={removeItem}
              openCart={openCart}
              confirmOrder={confirmOrder}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuPageClient
