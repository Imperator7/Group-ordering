import { Schema, model, models, type Model } from 'mongoose'
import { FOOD_CATEGORIES } from '@/config'
import { IMenuItemDb } from '@/shared/schemas/menuItem'

const MenuItemModelSchema = new Schema<IMenuItemDb>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: FOOD_CATEGORIES,
    },
    image: { type: String },
  },
  {
    timestamps: true,
  }
)

const MenuItemModel: Model<IMenuItemDb> =
  (models.MenuItem as Model<IMenuItemDb>) ||
  model<IMenuItemDb>('MenuItem', MenuItemModelSchema)

export default MenuItemModel
