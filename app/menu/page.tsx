import { MenuItemResponse } from '@/shared/schemas/menuItem'
import MenuPageClient from './_components/MenuPageClient'
import { getMenuItems } from '@/lib/server/services/menu'
import { Suspense } from 'react'

const MenuPage = async () => {
  const menuItems: MenuItemResponse[] = await getMenuItems()

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Suspense
        fallback={<div className="text-center p-4">Loading menu...</div>}
      >
        <MenuPageClient menuItems={menuItems} />
      </Suspense>
    </main>
  )
}
export default MenuPage
