'use client'

import { QRCodeSVG } from 'qrcode.react'

type SessionQRModalProps = {
  sessionId: string
  tableNumber: string
  onClose: () => void
}

export default function SessionQRModal({
  sessionId,
  tableNumber,
  onClose,
}: SessionQRModalProps) {
  const orderUrl = `${window.location.origin}/order?sessionId=${sessionId}&table=${tableNumber}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-1">Table {tableNumber}</h2>
        <p className="text-slate-500 text-sm mb-6">Scan to view menu & order</p>

        <QRCodeSVG value={orderUrl} size={200} level="H" />

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-6 py-2 text-slate-500 hover:text-slate-900"
        >
          Close
        </button>
      </div>
    </div>
  )
}
