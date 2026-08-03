import Link from 'next/link'
import { AppHeader } from '@/components/layout/app-header'
import { MobileContainer } from '@/components/layout/mobile-container'
import { CreateLoanForm } from '@/components/forms/create-loan-form'
import { requireSession } from '@/lib/auth'
import { db } from '@/lib/db'

export default async function PinjamPage() {
  const roomId = await requireSession()

  const roomResult = await db.execute({
    sql: 'SELECT person_one, person_two FROM rooms WHERE id = ?',
    args: [roomId],
  })

  const room = roomResult.rows[0]

  const loansResult = await db.execute({
    sql: `
      SELECT *
      FROM loans
      WHERE room_id = ?
      ORDER BY created_at DESC
    `,
    args: [roomId],
  })

  return (
    <MobileContainer>
      <AppHeader
        title="Pinjam 💸"
        subtitle="Catat pinjaman dari tabungan bersama"
      />

      <div className="space-y-5 p-5">
        <CreateLoanForm
          personOne={String(room.person_one)}
          personTwo={String(room.person_two)}
        />

        <div className="space-y-3 rounded-2xl border border-pink-100 bg-white p-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Daftar Pinjaman
          </h3>

          {loansResult.rows.length === 0 ? (
            <p className="text-sm text-gray-500">
              Belum ada pinjaman aktif 💕
            </p>
          ) : (
            loansResult.rows.map((loan) => (
              <div
                key={Number(loan.id)}
                className="rounded-xl border border-pink-50 bg-pink-50/40 p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {String(loan.borrower)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {String(loan.purpose)}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                      String(loan.status) === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-pink-100 text-pink-600'
                    }`}
                  >
                    {String(loan.status) === 'paid' ? 'Lunas' : 'Aktif'}
                  </span>
                </div>

                <p className="mt-3 text-sm font-semibold text-gray-800">
                  Sisa: Rp{' '}
                  {Number(loan.remaining_amount).toLocaleString('id-ID')}
                </p>
              </div>
            ))
          )}
        </div>

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
