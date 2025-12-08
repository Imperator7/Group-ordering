import z from 'zod'
import { Types } from 'mongoose'
import { FoodCategorySchema } from './common'

export const MenuItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.coerce.number().nonnegative("Price can't be negative"),
  category: FoodCategorySchema,
  image: z.url('Invalid image URL').optional(),
})

export type MenuItem = z.infer<typeof MenuItemSchema>

export const MenuItemResponseSchema = MenuItemSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type MenuItemResponse = z.infer<typeof MenuItemResponseSchema>

export interface IMenuItemDb extends MenuItem {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export function toMenuItemResponse(doc: IMenuItemDb): MenuItemResponse {
  return {
    id: doc._id.toString(),
    name: doc.name,
    price: doc.price,
    category: doc.category,
    image: doc.image,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  }
}
