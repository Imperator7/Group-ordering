'use client'

import { MenuItemResponse } from '@/shared/schemas/menuItem'
import MenuCard from './MenuCard'

type MenuListProps = {
  menu: MenuItemResponse[]
  addCartOne: (id: string) => void
}

const MenuList = ({ menu, addCartOne }: MenuListProps) => {
  return (
    <ul className="grid grid-cols-1">
      {menu.map((menuItem) => (
        <MenuCard
          menuItem={menuItem}
          key={menuItem.name}
          addCartOne={addCartOne}
        />
      ))}
    </ul>
  )
}
export default MenuList
