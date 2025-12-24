import MenuList from './MenuList'
import EmptyMenu from './EmptyMenu'
import { ShoppingBasket } from 'lucide-react'
import { MenuItemResponse } from '@/shared/schemas/menuItem'
import { useCartContext } from '@/contexts/CartContext'

type MenuProps = {
  menu: MenuItemResponse[]
  openCart: () => void
  getOrderedCount: (menuItemId: string) => number
  tableNumber: string
  openQR: () => void
}

const Menu = ({
  menu,
  openCart,
  getOrderedCount,
  tableNumber,
  openQR,
}: MenuProps) => {
  const isEmpty = !menu || menu.length === 0
  const { totalItems, addOne: addCartOne, existInCart } = useCartContext()

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2 items-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            เมนู
          </h2>
          <h3 className="p-2 bg-slate-400 font-bold rounded text-white">
            โต๊ะ {tableNumber}
          </h3>
          <button
            type="button"
            onClick={() => openQR()}
            className="p-2 bg-green-500 hover:bg-green-600 rounded cursor-pointer transition"
            title="Show QR Code"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={openCart} // Pass function directly
          className="flex items-center space-x-2 px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <ShoppingBasket aria-hidden="true" />
          <span>ตระกร้า</span>
          <span className="p-1 leading-none bg-white/15 rounded-xs text-sm font-medium">
            {totalItems}
          </span>
        </button>
      </div>

      {isEmpty ? (
        <EmptyMenu />
      ) : (
        <MenuList
          menu={menu}
          addCartOne={addCartOne}
          getOrderedCount={getOrderedCount}
          existInCart={existInCart}
        />
      )}
    </section>
  )
}

export default Menu
