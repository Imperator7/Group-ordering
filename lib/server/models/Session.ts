// src/lib/models/Session.ts
import { Schema, model, models, type Model } from 'mongoose'
import { ISessionDb } from '@/shared/schemas/session'

const SessionSchema = new Schema<ISessionDb>(
  {
    tableNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
      index: true,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    closedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const SessionModel: Model<ISessionDb> =
  (models.Session as Model<ISessionDb>) ||
  model<ISessionDb>('Session', SessionSchema)

export default SessionModel
