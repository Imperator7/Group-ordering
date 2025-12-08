import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <span className="text-8xl">🍽️</span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-800 mb-3">
          Page Unavailable
        </h1>
        <p className="text-slate-500 mb-8">
          The page isn&apos;t available right now, but our menu is ready for
          you.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors"
        >
          View Menu
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14m-7-7 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
