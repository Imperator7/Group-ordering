'use client'

import { MenuItemResponse } from '@/shared/schemas/menuItem'
import { useState, useCallback } from 'react'
import { submitOrder } from '@/lib/client/services/orders'
import {
  CreateOrderInput,
  OrderItem,
  OrderResponse,
} from '@/shared/schemas/order'

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

  const getItemId = (item: MenuItemResponse) => item.id

  const addItemOne = useCallback(
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

  const removeItemOne = useCallback((id: string) => {
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

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  )

  const confirmOrder = async (sessionId: string) => {
    const menuItems: OrderItem[] = cart.map((cartItem) => {
      return {
        menuItemId: cartItem.id,
        name: cartItem.name,
        price: cartItem.price,
        quantity: cartItem.quantity,
      }
    })

    const submitData: CreateOrderInput = {
      sessionId: sessionId,
      items: menuItems,
    }

    try {
      const res: OrderResponse = await submitOrder(submitData)

      clearCart()

      return res
    } catch (error) {
      console.error(error)
    }
  }

  return {
    cart,
    getItemId,
    addItemOne,
    removeItemOne,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    confirmOrder,
  }
}
