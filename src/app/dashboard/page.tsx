import { Wallet, Receipt, HandCoins, PiggyBank } from 'lucide-react'
import { AppHeader } from '@/components/layout/app-header'
import { MobileContainer } from '@/components/layout/mobile-container'

const menuItems = [
  {
    title: 'Nabung',
    desc: 'Catat setoran tabungan',
    icon: PiggyBank,
  },
  {
    title: 'Pinjam',
    desc: 'Catat pinjaman tabungan',
    icon: HandCoins,
  },
  {
    title: 'Cicilan',
    desc: 'Bayar pinjaman sedikit demi sedikit',
    icon: Wallet,
  },
  {
    title: 'Pemakaian',
    desc: 'Pengeluaran untuk kebutuhan berdua',
    icon: Receipt,
  },
]

export default function DashboardPage() {
  return (
    <MobileContainer>
      <AppHeader
        title="Tabungan Kita 💗"
        subtitle="Semoga cepat terkumpul untuk semua rencana indah kalian ✨"
      />

      <div className="space-y-5 p-5">
        <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-rose-400 p-5 text-white shadow-lg shadow-pink-200">
          <p className="text-sm text-pink-100">Saldo tersedia</p>
          <h2 className="mt-2 text-3xl font-bold">Rp 0</h2>
          <p className="mt-3 text-xs text-pink-100">
            Nanti akan terhitung otomatis dari semua transaksi ✨
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-pink-100 bg-white p-4">
            <p className="text-xs text-gray-500">Damar</p>
            <p className="mt-1 text-lg font-bold text-gray-800">Rp 0</p>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-white p-4">
            <p className="text-xs text-gray-500">Ayang</p>
            <p className="mt-1 text-lg font-bold text-gray-800">Rp 0</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">Menu Cepat</h3>

          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.title}
                className="flex w-full items-center gap-4 rounded-2xl border border-pink-100 bg-white p-4 text-left transition hover:border-pink-200 hover:shadow-sm active:scale-[0.99]"
              >
                <div className="rounded-2xl bg-pink-50 p-3 text-pink-500">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="rounded-2xl border border-pink-100 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Riwayat Terbaru</h3>
            <span className="text-xs text-pink-500">Belum ada</span>
          </div>

          <div className="rounded-xl bg-pink-50 p-4 text-center text-sm text-gray-500">
            Transaksi pertama kalian akan muncul di sini 💕
          </div>
        </div>
      </div>
    </MobileContainer>
  )
}
