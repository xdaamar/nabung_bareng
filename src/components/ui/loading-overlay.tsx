'use client'

type LoadingOverlayProps = {
  text?: string
}

export function LoadingOverlay({
  text = 'Memuat...',
}: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-pink-100 bg-white px-6 py-5 shadow-xl shadow-pink-100">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-pink-100 border-t-pink-500" />
          <div className="absolute inset-2 rounded-full bg-pink-50" />
          <div className="absolute inset-[18px] rounded-full bg-pink-400" />
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-pink-600">{text}</p>
          <p className="mt-1 text-xs text-gray-500">
            Sebentar ya, tabungan kalian sedang disiapkan 💕
          </p>
        </div>
      </div>
    </div>
  )
}
