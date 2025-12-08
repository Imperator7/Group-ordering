type EmptyCartProps = {
  openCart: () => void
}

const EmptyCart = ({ openCart }: EmptyCartProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <p>ตะกร้ายังว่างอยู่</p>
    </div>
  )
}
export default EmptyCart
