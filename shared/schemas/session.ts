import { z } from 'zod'
import { Types } from 'mongoose'

export const SessionStatusSchema = z.enum(['open', 'closed'] as const)
export type SessionStatus = z.infer<typeof SessionStatusSchema>

export const SessionSchema = z.object({
  tableNumber: z.string().min(1, 'Table Number is required'),
  status: SessionStatusSchema,
  startedAt: z.date(),
  closedAt: z.date().optional(),
})

export type Session = z.infer<typeof SessionSchema>

export interface ISessionDb extends Session {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export const CreateSessionSchema = SessionSchema.pick({ tableNumber: true })
export type CreateSessionInput = z.infer<typeof CreateSessionSchema>

export const UpdateSessionSchema = SessionSchema.pick({ status: true })
export type UpdateSessionInput = z.infer<typeof UpdateSessionSchema>

export const SessionResponseSchema = z.object({
  id: z.string(),
  tableNumber: z.string(),
  status: SessionStatusSchema,
  startedAt: z.string(),
  closedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type SessionResponse = z.infer<typeof SessionResponseSchema>

export function toSessionResponse(doc: ISessionDb): SessionResponse {
  return {
    id: doc._id.toString(),
    tableNumber: doc.tableNumber,
    status: doc.status,
    startedAt: doc.startedAt.toISOString(),
    closedAt: doc.closedAt?.toISOString() ?? null,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  }
}
