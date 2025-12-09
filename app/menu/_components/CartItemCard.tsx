import { Minus, Plus, Trash } from 'lucide-react'
import { CartItem } from '../../../hooks/useCart'
import Image from 'next/image'

type CartItemCardProps = {
  cartItem: CartItem
  operation: {
    addOne: (id: string) => void
    removeOne: (id: string) => void
    removeItem: (id: string) => void
  }
  orderedCount: number
}

const CartItemCard = ({
  cartItem,
  operation,
  orderedCount,
}: CartItemCardProps) => {
  return (
    <div
      key={cartItem.name}
      className="flex items-center gap-2 p-3 bg-white rounded border border-gray-200 shadow-sm"
    >
      <Image
        src={cartItem.image || '/image-not-found.jpg'}
        alt={cartItem.name}
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-md shrink-0 bg-gray-100"
      />

      <div className="flex-1 min-w-0 mr-2">
        <h3 className="font-semibold text-sm text-gray-900 truncate">
          {cartItem.name}
        </h3>
        {orderedCount > 0 && (
          <span className="text-xs text-orange-600 font-medium">
            กำลังมา {orderedCount} จาน
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center h-8 border border-gray-200 rounded-lg bg-gray-50">
          <button
            onClick={() => operation.removeOne(cartItem.id)}
            className="w-8 h-full flex items-center justify-center hover:bg-white rounded-l-lg text-gray-600 transition-colors"
          >
            <Minus size={12} />
          </button>

          <span className="w-8 text-center text-sm font-medium text-gray-900">
            {cartItem.quantity}
          </span>

          <button
            onClick={() => operation.addOne(cartItem.id)}
            className="w-8 h-full flex items-center justify-center hover:bg-white rounded-r-lg text-gray-600 transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>

        {/* Trash Icon */}
        <button
          onClick={() => operation.removeItem(cartItem.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Remove item"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  )
}
export default CartItemCard
