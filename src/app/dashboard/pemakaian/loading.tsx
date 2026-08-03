import { MobileContainer } from '@/components/layout/mobile-container'

export default function LoadingPemakaian() {
  return (
    <MobileContainer>
      <div className="space-y-4 p-5">
        <div className="flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600 shadow-sm">
          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-pink-400" />
          Menyiapkan pengeluaran bersama 🛍️
        </div>

        <div className="h-72 animate-pulse rounded-2xl bg-pink-100" />
      </div>
    </MobileContainer>
  )
}
