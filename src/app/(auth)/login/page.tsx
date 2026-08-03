import Link from 'next/link'
import { AppHeader } from '@/components/layout/app-header'
import { MobileContainer } from '@/components/layout/mobile-container'
import { PrimaryButton } from '@/components/ui/primary-button'
import { loginAction } from '@/actions/auth.actions'

export default function LoginPage() {
  return (
    <MobileContainer>
      <AppHeader
        title="Masuk ke Tabungan 💗"
        subtitle="Masukkan kode unik dan PIN kalian"
      />

      <form action={loginAction} className="space-y-5 p-5">
        <div className="overflow-hidden rounded-2xl border border-pink-100 shadow-sm">
          <img
            src="https://media1.tenor.com/m/XJ4sqEoJSS8AAAAC/love-in-love.gif"
            alt="Couple login animation"
            className="h-48 w-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Kode Tabungan
          </label>
          <input
            name="roomCode"
            required
            placeholder="Contoh: NAMA-XXX"
            className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">PIN</label>
          <input
            name="pin"
            type="password"
            required
            placeholder="••••••"
            className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
          />
        </div>

        <PrimaryButton type="submit">Masuk 💖</PrimaryButton>

        <Link
          href="/register"
          className="block rounded-2xl border border-pink-100 bg-pink-50 p-4 text-center text-sm font-medium text-pink-600"
        >
          Buat Tabungan Baru ✨
        </Link>
      </form>
    </MobileContainer>
  )
}
