import { getOccupiedTables } from '@/lib/server/services/session'

const Page = async () => {
  const occupiedTables = await getOccupiedTables()
  const hasOccupiedTables = occupiedTables.length > 0

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Occupied Tables</h1>

      {hasOccupiedTables ? (
        <ul className="flex flex-wrap gap-2">
          {occupiedTables.map((table) => (
            <li key={table} className="px-3 py-1 rounded-lg border text-sm">
              Table {table}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">
          No tables are currently occupied.
        </p>
      )}
    </div>
  )
}

export default Page
