import { z } from 'zod'
import { TABLE_NUMBERS, FOOD_CATEGORIES, ORDER_STATUSES } from '@/config/index'

export const TableNumberSchema = z.enum(TABLE_NUMBERS)
export const FoodCategorySchema = z.enum(FOOD_CATEGORIES)
export const OrderStatusSchema = z.enum(ORDER_STATUSES)
