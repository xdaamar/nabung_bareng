import Link from 'next/link'
import { AppHeader } from '@/components/layout/app-header'
import { MobileContainer } from '@/components/layout/mobile-container'
import { PayInstallmentForm } from '@/components/forms/pay-installment-form'
import { requireSession } from '@/lib/auth'
import { db } from '@/lib/db'

export default async function CicilanPage() {
  const roomId = await requireSession()

  const loansResult = await db.execute({
    sql: `
      SELECT id, borrower, purpose, remaining_amount
      FROM loans
      WHERE room_id = ? AND status = 'active'
      ORDER BY created_at ASC
    `,
    args: [roomId],
  })

  return (
    <MobileContainer>
      <AppHeader
        title="Cicilan 💳"
        subtitle="Catat pengembalian pinjaman"
      />

      <div className="space-y-4 p-5">
        {loansResult.rows.length === 0 ? (
          <div className="rounded-2xl border border-pink-100 bg-white p-4 text-center text-sm text-gray-500">
            Tidak ada pinjaman aktif untuk dicicil 💕
          </div>
        ) : (
          loansResult.rows.map((loan) => (
            <PayInstallmentForm
              key={Number(loan.id)}
              loanId={Number(loan.id)}
              borrower={String(loan.borrower)}
              purpose={String(loan.purpose)}
              remainingAmount={Number(loan.remaining_amount)}
            />
          ))
        )}

        <Link
          href="/dashboard"
          className="block rounded-2xl border border-pink-100 bg-white p-4 text-center text-sm font-medium text-gray-600"
        >
          ← Kembali ke Dashboard
        </Link>
      </div>
    </MobileContainer>
  )
}
