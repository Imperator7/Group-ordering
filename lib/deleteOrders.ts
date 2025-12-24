import OrderModel from './server/models/Order'
import mongoose from 'mongoose'

async function deleteOrders() {
  const uri = process.env.MONGODB_URI!

  if (!uri) {
    throw new Error('MONGODB_URI is missing in .env.local')
  }

  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(uri)

    console.log('Deleting old data...')
    await OrderModel.deleteMany({ status: 'pending' })

    console.log('✅ Database seeded successfully')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
  } finally {
    await mongoose.disconnect()
  }
}

deleteOrders()
