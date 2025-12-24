'use client'

import { createContext, useContext, useMemo, ReactNode } from 'react'
import { MenuItemResponse } from '@/shared/schemas/menuItem'
import { useCart } from '@/hooks/useCart'

type CartContextType = ReturnType<typeof useCart>

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({
  children,
  menuItems,
}: {
  children: ReactNode
  menuItems: MenuItemResponse[]
}) {
  const {
    cart,
    getItemId,
    addOne,
    removeOne,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    existInCart,
  } = useCart({ menuItems })

  const value = useMemo(
    () => ({
      cart,
      getItemId,
      addOne,
      removeOne,
      removeItem,
      clearCart,
      totalItems,
      totalPrice,
      existInCart,
    }),
    [
      cart,
      getItemId,
      addOne,
      removeOne,
      removeItem,
      clearCart,
      totalItems,
      totalPrice,
      existInCart,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
