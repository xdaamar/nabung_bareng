import { formatDate, formatRupiah } from '@/lib/format'

type Transaction = {
  type: string
  person: string
  amount: number
  note: string | null
  created_at: string
}

type TransactionListProps = {
  transactions: Transaction[]
}

function getTransactionLabel(type: string, person: string) {
  switch (type) {
    case 'deposit':
      return `${person} menabung`
    case 'loan':
      return `${person} meminjam`
    case 'loan_repayment':
      return `${person} membayar cicilan`
    case 'shared_expense':
      return `${person} menggunakan tabungan`
    default:
      return person
  }
}

export function TransactionList({
  transactions,
}: TransactionListProps) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">
          Riwayat Terbaru
        </h3>
      </div>

      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="rounded-xl bg-pink-50 p-4 text-center text-sm text-gray-500">
            Belum ada transaksi 💕
          </div>
        ) : (
          transactions.map((transaction, index) => {
            const isPositive =
              transaction.type === 'deposit' ||
              transaction.type === 'loan_repayment'
            const prefix = isPositive ? '+' : '-'
            const colorClass = isPositive
              ? 'text-pink-600'
              : 'text-rose-500'

            return (
              <div
                key={`${transaction.created_at}-${index}`}
                className="flex items-start justify-between rounded-xl border border-pink-50 bg-pink-50/40 p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {getTransactionLabel(
                      transaction.type,
                      transaction.person,
                    )}
                  </p>

                  {transaction.note && (
                    <p className="mt-1 text-xs text-gray-500">
                      {transaction.note}
                    </p>
                  )}

                  <p className="mt-1 text-[11px] text-gray-400">
                    {formatDate(transaction.created_at)}
                  </p>
                </div>

                <p className={`ml-3 text-sm font-semibold ${colorClass}`}>
                  {prefix}
                  {formatRupiah(transaction.amount)}
                </p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
