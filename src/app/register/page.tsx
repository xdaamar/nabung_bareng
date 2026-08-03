import { AppHeader } from '@/components/layout/app-header'
import { MobileContainer } from '@/components/layout/mobile-container'
import { PrimaryButton } from '@/components/ui/primary-button'
import { createRoomAction } from '@/actions/auth.actions'

export default function RegisterPage() {
  return (
    <MobileContainer>
      <AppHeader
        title="Buat Tabungan Baru 💕"
        subtitle="Isi data kalian untuk mulai nabung bareng"
      />

      <form action={createRoomAction} className="space-y-4 p-5">
        <div className="flex justify-center">
          <img
            src="https://media1.tenor.com/m/XJ4sqEoJSS8AAAAC/love-in-love.gif"
            alt="Couple register animation"
            className="h-28 w-auto object-contain"
          />
        </div>

        <input
          name="personOne"
          required
          placeholder="Nama Penabung 1"
          className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
        />

        <input
          name="personTwo"
          required
          placeholder="Nama Penabung 2"
          className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
        />

        <input
          name="roomCode"
          required
          placeholder="Kode unik (contoh: NAMA-XXX)"
          className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
        />

        <input
          name="pin"
          type="password"
          required
          placeholder="PIN rahasia"
          className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
        />

        <PrimaryButton type="submit">Buat Tabungan 💗</PrimaryButton>
      </form>
    </MobileContainer>
  )
}
