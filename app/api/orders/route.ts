import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { createOrder } from '@/lib/server/services/order'
import { CreateOrderSchema } from '@/shared/schemas/order'

export async function POST(req: Request) {
  await dbConnect()

  const body = await req.json()
  const validData = CreateOrderSchema.safeParse(body)

  if (!validData.success) {
    console.log('ERROR', validData.error)
    return NextResponse.json(
      { success: false, error: 'Request data is not valid' },
      { status: 400 }
    )
  }
  const { sessionId, items } = validData.data

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  }

  try {
    const orderRes = await createOrder({ sessionId, items })
    return NextResponse.json({ success: true, data: orderRes }, { status: 201 })
  } catch (e) {
    console.error('Error in POST /api/orders:', e)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {}
