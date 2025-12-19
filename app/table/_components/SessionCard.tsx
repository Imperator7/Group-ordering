// src/app/table/_components/SessionCard.tsx
'use client'

import { timeSince } from '@/lib/helper'
import { SessionResponse } from '@/shared/schemas/session'
import { useRouter } from 'next/navigation'

type SessionCardProps = {
  session: SessionResponse
  handleCloseSession: (session: SessionResponse) => void
  handleShowQR: (session: SessionResponse) => void
}

const SessionCard = ({
  session,
  handleCloseSession,
  handleShowQR,
}: SessionCardProps) => {
  const router = useRouter()
  const activeTime = timeSince(session.startedAt)

  const goToMenu = () => {
    router.push(`/menu?sessionId=${session.id}&table=${session.tableNumber}`)
  }

  return (
    <li className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden w-72">
      <div className="bg-emerald-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-emerald-100 text-sm font-medium">Table</span>
          <span className="text-white text-2xl font-bold">
            {session.tableNumber}
          </span>
        </div>
        <button
          type="button"
          onClick={() => handleShowQR(session)}
          className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
          title="Show QR Code"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Active
          </span>
          <span className="text-slate-400 text-sm">{activeTime}</span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Started</span>
            <span className="text-slate-700 font-medium">
              {new Date(session.startedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Session</span>
            <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
              {session.id}
            </code>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex gap-2">
        <button
          type="button"
          onClick={goToMenu}
          className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition cursor-pointer"
        >
          Visit Table&apos;s menu
        </button>
        <button
          type="button"
          onClick={() => handleCloseSession(session)}
          className="px-4 py-2.5 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 hover:border-red-300 transition  cursor-pointer"
        >
          Close
        </button>
      </div>
    </li>
  )
}

export default SessionCard
