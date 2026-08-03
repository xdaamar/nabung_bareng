import { MobileContainer } from '@/components/layout/mobile-container'

export default function LoadingDashboard() {
  return (
    <MobileContainer>
      <div className="space-y-4 p-5">
        <div className="h-32 animate-pulse rounded-3xl bg-pink-100" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 animate-pulse rounded-2xl bg-pink-100" />
          <div className="h-20 animate-pulse rounded-2xl bg-pink-100" />
        </div>
        <div className="space-y-3">
          <div className="h-20 animate-pulse rounded-2xl bg-pink-100" />
          <div className="h-20 animate-pulse rounded-2xl bg-pink-100" />
          <div className="h-20 animate-pulse rounded-2xl bg-pink-100" />
        </div>
      </div>
    </MobileContainer>
  )
}
