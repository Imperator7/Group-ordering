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
  const qrUrl = `${window.location.origin}/menu?sessionId=${sessionId}&table=${tableNumber}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-emerald-600 px-6 py-4 text-center">
          <p className="text-emerald-100 text-sm">Scan to order</p>
          <p className="text-white text-3xl font-bold">Table {tableNumber}</p>
        </div>

        <div className="p-8 flex justify-center">
          <QRCodeSVG value={qrUrl} size={200} level="H" />
        </div>

        {/* <div className="px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 text-slate-600 hover:text-slate-900 font-medium transition"
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  )
}
