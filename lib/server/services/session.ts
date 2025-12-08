import { TableNumber } from '@/config'
import dbConnect from '@/lib/db'
import SessionModel from '@/lib/server/models/Session'
import { Session } from '@/shared/schemas/session'

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
