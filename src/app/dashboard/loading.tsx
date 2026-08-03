import { MobileContainer } from '@/components/layout/mobile-container'

export default function DashboardLoading() {
  return (
    <MobileContainer>
      <div className="space-y-5 p-5">
        <div className="flex items-center justify-center py-6">
          <div className="flex items-center gap-3 rounded-full bg-pink-50 px-4 py-2 shadow-sm">
            <div className="h-3 w-3 animate-ping rounded-full bg-pink-400" />
            <p className="text-sm font-medium text-pink-600">
              Mengambil tabungan kalian 💕
            </p>
          </div>
        </div>

        <div className="h-36 animate-pulse rounded-3xl bg-pink-100" />

        <div className="grid grid-cols-2 gap-3">
          <div className="h-24 animate-pulse rounded-2xl bg-pink-100" />
          <div className="h-24 animate-pulse rounded-2xl bg-pink-100" />
        </div>

        <div className="h-48 animate-pulse rounded-2xl bg-pink-100" />
        <div className="h-64 animate-pulse rounded-2xl bg-pink-100" />
      </div>
    </MobileContainer>
  )
}
