import dbConnect from '@/lib/db'
import MenuItemModel from '../models/MenuItem'
import {
  MenuItem,
  MenuItemResponse,
  toMenuItemResponse,
} from '@/shared/schemas/menuItem'

export async function getMenuItems(): Promise<MenuItemResponse[]> {
  await dbConnect()

  const items = await MenuItemModel.find().lean()
  const parsed: MenuItemResponse[] = items.map(toMenuItemResponse)

  return parsed
}

export async function createMenuItem(
  data: MenuItem
): Promise<MenuItemResponse> {
  await dbConnect()

  const newItem = await MenuItemModel.create(data)

  return toMenuItemResponse(newItem.toObject())
}
