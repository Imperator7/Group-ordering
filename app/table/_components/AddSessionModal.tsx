// components/AddSessionModal.tsx
'use client'

import { useState } from 'react'
import { createSession } from '@/lib/client/services/session'
import { X, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AddSessionModalProps {
  unoccupiedTables: string[]
  isOpen: boolean
  onClose: () => void
}

export default function AddSessionModal({
  unoccupiedTables,
  isOpen,
  onClose,
}: AddSessionModalProps) {
  const [tableNumber, setTableNumber] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tableNumber) return

    setIsLoading(true)
    setError('')

    try {
      await createSession({ tableNumber })

      setTableNumber('')
      router.refresh()
      onClose()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-900">New Session</h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className=" space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Free tables</h3>
            <ul className="flex flex-wrap gap-2">
              {unoccupiedTables.length === 0 ? (
                <p className="text-slate-500 text-sm">No tables available</p>
              ) : (
                unoccupiedTables.map((tableNum) => (
                  <li key={tableNum}>
                    <button
                      type="button"
                      onClick={() => setTableNumber(tableNum)}
                      className={`flex items-center justify-center w-10 h-10 font-semibold rounded-lg shadow-sm border transition-all cursor-pointer
            ${
              tableNumber === tableNum
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-linear-to-br from-green-100 to-green-200 text-green-800 border-green-300 hover:from-green-200 hover:to-green-300'
            }`}
                    >
                      {tableNum}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !tableNumber}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Session'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
