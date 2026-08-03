import { Suspense } from 'react'

export function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <div className="h-32 animate-pulse rounded-3xl bg-pink-100" />
          <div className="h-24 animate-pulse rounded-2xl bg-pink-100" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}
