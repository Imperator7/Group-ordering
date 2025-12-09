import { MenuItemResponse } from '@/shared/schemas/menuItem'
import MenuPageClient from './_components/MenuPageClient'
import { getMenuItems } from '@/lib/server/services/menu'

const MenuPage = async () => {
  const menuItems: MenuItemResponse[] = await getMenuItems()

  return (
    <main className="max-w-3xl mx-auto p-6">
      <MenuPageClient menuItems={menuItems} />
    </main>
  )
}
export default MenuPage
