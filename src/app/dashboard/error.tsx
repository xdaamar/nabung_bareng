'use client'

import { useEffect } from 'react'
import { MobileContainer } from '@/components/layout/mobile-container'
import { ErrorCard } from '@/components/ui/error-card'
import { PrimaryButton } from '@/components/ui/primary-button'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <MobileContainer>
      <div className="flex min-h-screen items-center justify-center p-5">
        <div className="w-full max-w-sm space-y-4">
          <ErrorCard message="Terjadi kesalahan saat memuat dashboard 💔" />

          <PrimaryButton type="button" onClick={reset}>
            Coba Lagi
          </PrimaryButton>
        </div>
      </div>
    </MobileContainer>
  )
}
