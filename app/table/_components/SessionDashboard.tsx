'use client'

import { SessionResponse } from '@/shared/schemas/session'
import SessionCard from './SessionCard'
import { closeSession } from '@/lib/client/services/session'
import { useState } from 'react'
import CloseConfirmationModal from './CloseConfirmationModal'
import SessionQRModal from './SessionQRModal'
import AddSessionModal from './AddSessionModal'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { TABLE_NUMBERS } from '@/config'

const SessionDashboard = ({
  occupiedTables,
}: {
  occupiedTables: SessionResponse[]
}) => {
  const hasOccupiedTables = occupiedTables.length > 0
  const [selectedSession, setSelectedSession] =
    useState<SessionResponse | null>(null)
  const [qrSession, setQrSession] = useState<SessionResponse | null>(null)
  const [isAddSessionOpen, setIsAddSessionOpen] = useState<boolean>(false)

  const occupiedTableNumbers = new Set(
    occupiedTables.map((session) => session.tableNumber)
  )
  const unoccupiedTableNumbers = TABLE_NUMBERS.filter(
    (num) => !occupiedTableNumbers.has(num)
  )

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

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8 justify-between flex">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Tables</h1>
            <p className="text-slate-500 mt-1">
              {hasOccupiedTables
                ? `${occupiedTables.length} table${
                    occupiedTables.length !== 1 ? 's' : ''
                  } currently occupied`
                : 'No tables occupied'}
            </p>
          </div>
          <button
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
            onClick={() => setIsAddSessionOpen(true)}
          >
            <Plus className="w-5 h-5" />
            <span>Add Session</span>
          </button>
        </header>

        {hasOccupiedTables ? (
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(180px,300px))] gap-4">
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
        <SessionQRModal
          sessionId={qrSession.id}
          tableNumber={qrSession.tableNumber}
          onClose={() => setQrSession(null)}
        />
      )}

      <AddSessionModal
        unoccupiedTables={unoccupiedTableNumbers}
        isOpen={isAddSessionOpen}
        onClose={() => setIsAddSessionOpen(false)}
      />
    </main>
  )
}

export default SessionDashboard
