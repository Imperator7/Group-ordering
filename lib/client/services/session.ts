import {
  SessionResponse,
  SessionResponseSchema,
  UpdateSessionSchema,
} from '@/shared/schemas/session'
import { Patch } from '@/lib/client/api'

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
