'use client'

import { timeSince } from '@/lib/helper'
import { SessionResponse } from '@/shared/schemas/session'

interface CloseConfirmationModalProps {
  session: SessionResponse
  onConfirm: () => void
  onCancel: () => void
}

const CloseConfirmationModal = ({
  session,
  onConfirm,
  onCancel,
}: CloseConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all duration-300 scale-100">
        <h3 className="text-xl font-bold text-red-600 mb-3 border-b pb-2 flex items-center">
          ⚠️ Confirm Session Close
        </h3>

        <p className="text-gray-700 mb-6">
          You are about to close the session for **Table {session.tableNumber}
          **. This will finalize the order and cannot be undone.
        </p>

        <div className="bg-red-50 p-3 rounded-lg text-sm text-gray-700 mb-6">
          <p>
            <span className="font-semibold">Active for:</span>{' '}
            {timeSince(session.startedAt)}
          </p>
          <p>
            <span className="font-semibold">Session ID:</span>{' '}
            {session.id.substring(0, 12)}...
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Yes, Close Session
          </button>
        </div>
      </div>
    </div>
  )
}

export default CloseConfirmationModal
