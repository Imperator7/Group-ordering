'use client'

import { MenuItemResponse } from '@/shared/schemas/menuItem'
import { useState, useCallback, useMemo } from 'react'

export type CartItem = Pick<
  MenuItemResponse,
  'id' | 'name' | 'price' | 'image'
> & {
  quantity: number
}

type CartProps = {
  menuItems: MenuItemResponse[]
}

export function useCart({ menuItems }: CartProps) {
  const [cart, setCart] = useState<CartItem[]>([])

  const getItemId = useCallback((item: MenuItemResponse) => item.id, [])

  const addOne = useCallback(
    (id: string) => {
      setCart((prev: CartItem[]) => {
        const existing = prev.find((item) => item.id === id)

        if (existing) {
          return prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }

        const menuItem = menuItems.find((item) => item.id === id)

        if (!menuItem) {
          return prev
        }

        const newCartItem: CartItem = {
          id: id,
          name: menuItem.name,
          price: menuItem.price,
          image: menuItem.image,
          quantity: 1,
        }

        return [...prev, newCartItem]
      })
    },
    [menuItems]
  )

  const existInCart = (menuItemId: string): boolean => {
    return cart.some((cartItem) => menuItemId === cartItem.id)
  }

  const removeOne = useCallback((id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )
  const totalPrice = useMemo(
    () =>
      cart.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0),
    [cart]
  )

  return {
    cart,
    getItemId,
    addOne,
    removeOne,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    existInCart,
  }
}
