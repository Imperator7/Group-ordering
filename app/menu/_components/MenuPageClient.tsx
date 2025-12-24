'use client'

import { useSearchParams } from 'next/navigation'
import { MenuItemResponse } from '@/shared/schemas/menuItem'
import Menu from './Menu'
import OrderCart from './OrderCart'
import { useState } from 'react'
import { useOrderBySessionId } from '@/hooks/useOrder'
import SessionQRModal from '@/components/SessionQRModal'

type MenuPageClientProps = {
  menuItems: MenuItemResponse[]
}

const MenuPageClient = ({ menuItems }: MenuPageClientProps) => {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('sessionId')
  const tableNumber = searchParams.get('table') ?? '0'

  if (!sessionId) {
    throw new Error('sessionId is not found')
  }

  const { getOrderedCount } = useOrderBySessionId(sessionId)
  const [showCart, setShowCart] = useState<boolean>(false)
  const [showQR, setShowQR] = useState<boolean>(false)

  const openCart = () => setShowCart(true)
  const closeCart = () => setShowCart(false)
  const openQR = () => setShowQR(true)

  return (
    <>
      <div className="pb-24">
        <Menu
          menu={menuItems}
          openCart={openCart}
          getOrderedCount={getOrderedCount}
          tableNumber={tableNumber}
          openQR={openQR}
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
              openCart={openCart}
              getOrderedCount={getOrderedCount}
              sessionId={sessionId}
            />
          </div>
        </div>
      </div>
      {showQR && (
        <SessionQRModal
          sessionId={sessionId}
          tableNumber={tableNumber}
          onClose={() => setShowQR(false)}
        />
      )}
    </>
  )
}

export default MenuPageClient
