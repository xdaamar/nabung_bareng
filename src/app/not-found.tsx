import Link from 'next/link'
import { MobileContainer } from '@/components/layout/mobile-container'

export default function NotFound() {
  return (
    <MobileContainer>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="text-6xl">💗</div>

        <h1 className="text-2xl font-bold text-gray-800">
          Halaman tidak ditemukan
        </h1>

        <p className="text-sm text-gray-500">
          Mungkin halaman ini belum dibuat atau sudah dipindahkan.
        </p>

        <Link
          href="/dashboard"
          className="rounded-2xl bg-pink-500 px-5 py-3 text-sm font-semibold text-white"
        >
          Kembali ke Dashboard 💕
        </Link>
      </div>
    </MobileContainer>
  )
}
