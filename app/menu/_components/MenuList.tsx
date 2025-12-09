'use client'

import { MenuItemResponse } from '@/shared/schemas/menuItem'
import MenuCard from './MenuCard'

type MenuListProps = {
  menu: MenuItemResponse[]
  addCartOne: (id: string) => void
  getOrderedCount: (menuItemId: string) => number
}

const MenuList = ({ menu, addCartOne, getOrderedCount }: MenuListProps) => {
  return (
    <ul className="grid grid-cols-1">
      {menu.map((menuItem) => (
        <MenuCard
          menuItem={menuItem}
          key={menuItem.id}
          addCartOne={addCartOne}
          orderedCount={getOrderedCount(menuItem.id)}
        />
      ))}
    </ul>
  )
}
export default MenuList
