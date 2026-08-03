import { formatRupiah } from '@/lib/format'

type BalanceCardProps = {
  balance: number
}

export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-rose-400 p-5 text-white shadow-lg shadow-pink-200">
      <p className="text-sm text-pink-100">Saldo tersedia</p>
      <h2 className="mt-2 text-3xl font-bold">{formatRupiah(balance)}</h2>
      <p className="mt-3 text-xs text-pink-100">
        Terhitung otomatis dari seluruh transaksi ✨
      </p>
    </div>
  )
}
