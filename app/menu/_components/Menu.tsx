import MenuList from './MenuList'
import EmptyMenu from './EmptyMenu'
import { ShoppingBasket } from 'lucide-react'
import { MenuItemResponse } from '@/shared/schemas/menuItem'

type MenuProps = {
  menu: MenuItemResponse[]
  addCartOne: (id: string) => void
  openCart: () => void
  cartLength: string
}

const Menu = ({ menu, addCartOne, openCart, cartLength }: MenuProps) => {
  const isEmpty = !menu || menu.length === 0

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          เมนู
        </h2>
        <button
          onClick={openCart} // Pass function directly
          className="flex items-center space-x-2 px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
        >
          <ShoppingBasket aria-hidden="true" />
          <span>Cart</span>
          <span className="p-1 leading-none bg-white/15 rounded-xs text-sm font-medium">
            {cartLength}
          </span>
        </button>
      </div>

      {isEmpty ? (
        <EmptyMenu />
      ) : (
        <MenuList menu={menu} addCartOne={addCartOne} />
      )}
    </section>
  )
}

export default Menu
