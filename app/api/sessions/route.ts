import dbConnect from '@/lib/db'
import { createSession } from '@/lib/server/services/session'
import { CreateSessionSchema } from '@/shared/schemas/session'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  await dbConnect()

  const body = await req.json()
  const validData = CreateSessionSchema.safeParse(body)

  if (!validData.success) {
    console.log('ERROR', validData.error)
    return NextResponse.json(
      { success: false, error: 'Request data is not valid' },
      { status: 400 }
    )
  }
  const { tableNumber } = validData.data

  try {
    const tableRes = await createSession({ tableNumber })
    return NextResponse.json({ success: true, data: tableRes }, { status: 201 })
  } catch (e) {
    console.error('Error in POST /api/orders:', e)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
