import { getOccupiedTables } from '@/lib/server/services/session'
import SessionDashboard from './_components/SessionDashboard'

const Page = async () => {
  const occupiedTables = await getOccupiedTables()

  return <SessionDashboard occupiedTables={occupiedTables} />
}

export default Page
