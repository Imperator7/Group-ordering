import { TABLE_NUMBERS, type TableNumber } from '@/config'
import dbConnect from '@/lib/db'
import SessionModel from '@/lib/server/models/Session'
import {
  CreateSessionInput,
  Session,
  SessionResponse,
  toSessionResponse,
} from '@/shared/schemas/session'

export async function getExistingSessions() {
  await dbConnect()

  const sessions: Session[] = await SessionModel.find({ status: 'open' })
  return sessions
}

export async function getOccupiedTables(): Promise<TableNumber[]> {
  await dbConnect()

  const result = await SessionModel.find(
    { status: 'open' },
    { tableNumber: 1, _id: 0 }
  ).lean()

  return result.map((r) => r.tableNumber) as TableNumber[]
}

export async function createSession(
  data: CreateSessionInput
): Promise<SessionResponse> {
  await dbConnect()

  const { tableNumber } = data

  if (!TABLE_NUMBERS.includes(tableNumber as TableNumber)) {
    throw new Error(`Invalid table number: ${tableNumber}.`)
  }

  const existingSession = await SessionModel.findOne({
    tableNumber: tableNumber,
    status: 'open',
  }).exec()

  if (existingSession) {
    throw new Error(
      `Table ${tableNumber} is already occupied with an active session.`
    )
  }

  const doc = await SessionModel.create({
    tableNumber: tableNumber,
    status: 'open',
    startedAt: new Date(),
  })

  const res = toSessionResponse(doc)

  return res
}
