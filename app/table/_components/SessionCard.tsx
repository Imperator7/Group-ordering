'use client'

import { timeSince } from '@/lib/helper'
import { SessionResponse } from '@/shared/schemas/session'
import { useRouter } from 'next/navigation'

type SessionCardProps = {
  session: SessionResponse
  handleCloseSession: (session: SessionResponse) => void
}

const SessionCard = ({ session, handleCloseSession }: SessionCardProps) => {
  const router = useRouter()
  const activeTime = timeSince(session.startedAt)

  const goToMenu = () => {
    router.push(`/menu?sessionId=${session.id}`)
  }

  return (
    <li className="bg-white p-6 border-t-4 border-green-500 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-0.5 relative">
      <h2 className="text-4xl font-extrabold text-green-700 mb-2">
        <span className="text-xl font-semibold text-gray-400 mr-2">Table</span>
        {session.tableNumber}
      </h2>
      <div className="flex items-center space-x-3 text-sm text-gray-500 mb-4 border-b pb-4">
        <span
          className={`px-2 py-0.5 rounded-full font-semibold text-xs ${
            session.status === 'open'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {session.status.toUpperCase()}
        </span>
        <span className="text-gray-400">|</span>
        <span className="font-medium text-gray-700">
          Active: **{activeTime}**
        </span>
      </div>
      <ul className="space-y-2 text-gray-600">
        <li className="flex justify-between text-sm items-center">
          <span className="font-medium text-gray-700">Started At:</span>

          <span className="text-sm">
            {new Date(session.startedAt).toLocaleTimeString()}
          </span>
        </li>

        <li className="flex justify-between text-sm items-center">
          <span className="font-medium text-gray-700">Session ID:</span>

          <code className="text-xs bg-gray-100 p-1 rounded tracking-wider text-gray-600">
            {session.id.substring(0, 8)}...
          </code>
        </li>
      </ul>
      <div className="mt-8 flex space-x-3">
        <button
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md shadow-blue-200"
          onClick={goToMenu}
        >
          View/Add Order
        </button>

        <button
          className="w-1/3 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
          onClick={() => handleCloseSession(session)} // <-- Use the new confirmation handler
        >
          Close
        </button>
      </div>
    </li>
  )
}

export default SessionCard
