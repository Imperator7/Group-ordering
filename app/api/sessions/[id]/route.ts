import { NextResponse } from 'next/server'
import {
  toSessionResponse,
  UpdateSessionSchema,
} from '@/shared/schemas/session'
import SessionModel from '@/lib/server/models/Session'
import dbConnect from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect()

  const { id } = await params

  try {
    const body = await req.json()
    const validData = UpdateSessionSchema.safeParse(body)

    if (!validData.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid data' },
        { status: 400 }
      )
    }

    const { status } = validData.data

    const session = await SessionModel.findByIdAndUpdate(
      id,
      {
        status,
        ...(status === 'closed' && { closedAt: new Date() }),
      },
      { new: true }
    )

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: toSessionResponse(session),
    })
  } catch (e) {
    console.error('Error updating session:', e)
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    )
  }
}
