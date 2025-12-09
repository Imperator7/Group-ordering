import { getOccupiedTables } from '@/lib/server/services/session'
import SessionDashboard from './_components/SessionDashboard'

export const dynamic = 'force-dynamic'

const Page = async () => {
  const occupiedTables = await getOccupiedTables()

  return <SessionDashboard occupiedTables={occupiedTables} />
}

export default Page
