import {
  CreateSessionInput,
  CreateSessionSchema,
  SessionResponse,
  SessionResponseSchema,
  UpdateSessionSchema,
} from '@/shared/schemas/session'
import { Patch, Post } from '@/lib/client/api'

export async function closeSession(
  sessionId: string
): Promise<SessionResponse> {
  const url = '/api/sessions'

  const response = await Patch(
    `${url}/${sessionId}`,
    { status: 'closed' },
    UpdateSessionSchema,
    SessionResponseSchema
  )

  return response
}

export async function createSession({
  tableNumber,
}: CreateSessionInput): Promise<SessionResponse> {
  const url = '/api/sessions'

  const response = await Post(
    url,
    { tableNumber },
    CreateSessionSchema,
    SessionResponseSchema
  )

  return response
}
