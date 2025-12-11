import { Plus } from 'lucide-react'
import Image from 'next/image'
import { MenuItemResponse } from '@/shared/schemas/menuItem'
import { motion } from 'framer-motion'

type MenuCardProps = {
  menuItem: MenuItemResponse
  addCartOne: (id: string) => void
  orderedCount: number
  isInCart: boolean
}

const MenuCard = ({
  menuItem,
  addCartOne,
  orderedCount,
  isInCart,
}: MenuCardProps) => {
  return (
    <li className="group flex items-center justify-between p-4 -mx-6 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all duration-200">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={menuItem.image || '/image-not-found.jpg'}
            alt={menuItem.name}
            width={80}
            height={80}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = '/image-not-found.jpg'
            }}
          />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">
            {menuItem.name}
          </h3>
          {orderedCount > 0 && (
            <span className="text-xs text-green-600 font-medium">
              กำลังมา {orderedCount} จาน
            </span>
          )}
          <p className="text-slate-500 font-medium mt-1">฿{menuItem.price}</p>
        </div>
      </div>

      <motion.button
        className={[
          'flex items-center justify-center w-10 h-10 text-white rounded-full shadow-md cursor-pointer',
          isInCart ? 'bg-blue-600' : 'bg-blue-300',
        ].join(' ')}
        whileTap={{ scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        onClick={() => addCartOne(menuItem.id)}
        aria-label={`Add ${menuItem.name} to cart`}
      >
        <Plus size={20} />
      </motion.button>
    </li>
  )
}
export default MenuCard
