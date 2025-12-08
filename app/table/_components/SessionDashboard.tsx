'use client'

import { SessionResponse } from '@/shared/schemas/session'
import SessionCard from './SessionCard'
import { closeSession } from '@/lib/client/services/session'
import { useState } from 'react'
import CloseConfirmationModal from './CloseConfirmationModal'
import { useRouter } from 'next/navigation'

const SessionDashboard = ({
  occupiedTables,
}: {
  occupiedTables: SessionResponse[]
}) => {
  const hasOccupiedTables = occupiedTables.length > 0
  const [selectedSession, setSelectedSession] =
    useState<SessionResponse | null>(null)

  const router = useRouter()

  const handleCloseSession = (session: SessionResponse) => {
    setSelectedSession(session)
  }

  const confirmClose = async () => {
    if (!selectedSession) return

    try {
      await closeSession(selectedSession.id)
      setSelectedSession(null) // ← Closes modal
      router.refresh() // ← Updates table list
    } catch (error) {
      console.error('Failed to close session:', error)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Occupied Tables</h1>

      {hasOccupiedTables ? (
        <ul className="flex flex-wrap gap-2">
          {occupiedTables.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              handleCloseSession={handleCloseSession}
            />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">
          No tables are currently occupied.
        </p>
      )}

      {selectedSession && (
        <CloseConfirmationModal
          session={selectedSession}
          onConfirm={confirmClose}
          onCancel={() => setSelectedSession(null)}
        />
      )}
    </div>
  )
}
export default SessionDashboard
