// src/app/table/_components/SessionDashboard.tsx
'use client'

import { SessionResponse } from '@/shared/schemas/session'
import SessionCard from './SessionCard'
import { closeSession } from '@/lib/client/services/session'
import { useState } from 'react'
import CloseConfirmationModal from './CloseConfirmationModal'
import { QRCodeSVG } from 'qrcode.react'
import { useRouter } from 'next/navigation'

const SessionDashboard = ({
  occupiedTables,
}: {
  occupiedTables: SessionResponse[]
}) => {
  const hasOccupiedTables = occupiedTables.length > 0
  const [selectedSession, setSelectedSession] =
    useState<SessionResponse | null>(null)
  const [qrSession, setQrSession] = useState<SessionResponse | null>(null)

  const router = useRouter()

  const handleCloseSession = (session: SessionResponse) => {
    setSelectedSession(session)
  }

  const handleShowQR = (session: SessionResponse) => {
    setQrSession(session)
  }

  const confirmClose = async () => {
    if (!selectedSession) return

    try {
      await closeSession(selectedSession.id)
      setSelectedSession(null)
      router.refresh()
    } catch (error) {
      console.error('Failed to close session:', error)
    }
  }

  const qrUrl = qrSession
    ? `${window.location.origin}/order?sessionId=${qrSession.id}&table=${qrSession.tableNumber}`
    : ''

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Tables</h1>
          <p className="text-slate-500 mt-1">
            {hasOccupiedTables
              ? `${occupiedTables.length} table${
                  occupiedTables.length !== 1 ? 's' : ''
                } currently occupied`
              : 'No tables occupied'}
          </p>
        </header>

        {hasOccupiedTables ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {occupiedTables.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                handleCloseSession={handleCloseSession}
                handleShowQR={handleShowQR}
              />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <svg
              className="w-16 h-16 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <p className="text-lg font-medium text-slate-600">
              No active tables
            </p>
            <p className="text-sm">Tables will appear here when opened</p>
          </div>
        )}
      </div>

      {selectedSession && (
        <CloseConfirmationModal
          session={selectedSession}
          onConfirm={confirmClose}
          onCancel={() => setSelectedSession(null)}
        />
      )}

      {qrSession && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setQrSession(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-emerald-600 px-6 py-4 text-center">
              <p className="text-emerald-100 text-sm">Scan to order</p>
              <p className="text-white text-3xl font-bold">
                Table {qrSession.tableNumber}
              </p>
            </div>

            <div className="p-8 flex justify-center">
              <QRCodeSVG value={qrUrl} size={200} level="H" />
            </div>

            <div className="px-6 pb-6">
              <button
                type="button"
                onClick={() => setQrSession(null)}
                className="w-full py-3 text-slate-600 hover:text-slate-900 font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default SessionDashboard
