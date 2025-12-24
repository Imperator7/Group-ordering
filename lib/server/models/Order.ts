import { Schema, model, models, type Model } from 'mongoose'
import { OrderStatusSchema } from '@/shared/schemas/common'
import { IOrderItemDb, IOrderDb } from '@/shared/schemas/order'

const OrderItemSchema = new Schema<IOrderItemDb>(
  {
    menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    note: { type: String },
  },
  { _id: false }
)

const OrderSchema = new Schema<IOrderDb>(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: 'Session',
      required: true,
    },
    tableNumber: { type: String },
    status: {
      type: String,
      enum: OrderStatusSchema.options,
      default: 'preparing',
    },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
)

const OrderModel: Model<IOrderDb> =
  (models.Order as Model<IOrderDb>) || model<IOrderDb>('Order', OrderSchema)

export default OrderModel
