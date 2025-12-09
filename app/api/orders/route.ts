import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { createOrder, getOrders } from '@/lib/server/services/order'
import { CreateOrderSchema } from '@/shared/schemas/order'

export async function GET(req: Request) {
  await dbConnect()

  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('sessionId')

  if (!sessionId) {
    return NextResponse.json(
      { error: 'sessionId is required' },
      { status: 400 }
    )
  }

  try {
    await dbConnect()
    const orders = await getOrders({ sessionId })
    return NextResponse.json(orders)
  } catch (e) {
    console.error('Error in GET /api/orders:', e)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

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
