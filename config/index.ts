export const TABLE_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8'] as const
export type TableNumber = (typeof TABLE_NUMBERS)[number]

export const FOOD_CATEGORIES = [
  'meat',
  'seafood',
  'vegetables',
  'snacks',
] as const
export type FoodCategory = (typeof FOOD_CATEGORIES)[number]

export const ORDER_STATUSES = [
  'preparing',
  'ready',
  'served',
  'cancelled',
] as const
export type OrderStatus = (typeof ORDER_STATUSES)[number]
