import { Plus } from 'lucide-react'
import Image from 'next/image'
import { MenuItemResponse } from '@/shared/schemas/menuItem'

type MenuCardProps = {
  menuItem: MenuItemResponse
  addCartOne: (id: string) => void
}

const MenuCard = ({ menuItem, addCartOne }: MenuCardProps) => {
  return (
    <li className="group flex items-center justify-between p-4 -mx-6 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200 cursor-default">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={menuItem.image || '/image-not-found.jpg'}
            alt={menuItem.name}
            width={40}
            height={40}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = '/image-not-found.jpg'
            }}
          />
        </div>

        <div className="flex-col">
          <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-500 transition-colors line-clamp-1">
            {menuItem.name}
          </h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
            {menuItem.price} ฿
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between ml-4">
        <button
          className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full hover:bg-green-500 hover:text-white transition-colors duration-200"
          onClick={() => addCartOne(menuItem.id)}
          aria-label="Add to cart"
        >
          <Plus />
        </button>
      </div>
    </li>
  )
}
export default MenuCard
