import mongoose from 'mongoose'
import { type MenuItem } from '@/shared/schemas/menuItem'
import MenuItemModel from './server/models/MenuItem'

const seedData: MenuItem[] = [
  { name: 'หมูสันนอก', price: 0, category: 'meat' },
  { name: 'หมูสันใน', price: 0, category: 'meat' },
  { name: 'วุ่นเส้น', price: 0, category: 'vegetables' },
  { name: 'เต้าหู้', price: 0, category: 'vegetables' },
]

async function seedMenu() {
  const uri = process.env.MONGODB_URI!

  if (!uri) {
    throw new Error('MONGODB_URI is missing in .env.local')
  }

  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(uri)

    console.log('Deleting old data...')
    await MenuItemModel.deleteMany({})

    console.log('Inserting seed data...')
    await MenuItemModel.insertMany(seedData)

    console.log('✅ Database seeded successfully')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
  } finally {
    await mongoose.disconnect()
  }
}

seedMenu()
