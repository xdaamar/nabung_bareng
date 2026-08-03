import { redirect } from 'next/navigation'
import { AppHeader } from '@/components/layout/app-header'
import { MobileContainer } from '@/components/layout/mobile-container'
import { AddSavingForm } from '@/components/forms/add-saving-form'
import { getSessionRoomId } from '@/lib/auth'
import { db } from '@/lib/db'
import { getRoomBalance } from '@/lib/balance'
import { formatRupiah } from '@/lib/format'

export default async function DashboardPage() {
  const roomId = await getSessionRoomId()

  if (!roomId) {
    redirect('/login')
  }

  const roomResult = await db.execute({
    sql: 'SELECT * FROM rooms WHERE id = ?',
    args: [roomId],
  })

  const room = roomResult.rows[0]

  if (!room) {
    redirect('/login')
  }

  const balance = await getRoomBalance(roomId)

  const transactions = await db.execute({
    sql: `
      SELECT person, amount, note, created_at
      FROM transactions
      WHERE room_id = ?
      ORDER BY created_at DESC
      LIMIT 5
    `,
    args: [roomId],
  })

  return (
    <MobileContainer>
      <AppHeader
        title="Tabungan Kita 💗"
        subtitle={`${room.person_one} 💕 ${room.person_two}`}
      />

      <div className="space-y-5 p-5">
        <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-rose-400 p-5 text-white shadow-lg shadow-pink-200">
          <p className="text-sm text-pink-100">Saldo tersedia</p>
          <h2 className="mt-2 text-3xl font-bold">{formatRupiah(balance)}</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-pink-100 bg-white p-4">
            <p className="text-xs text-gray-500">{String(room.person_one)}</p>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-white p-4">
            <p className="text-xs text-gray-500">{String(room.person_two)}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-pink-100 bg-white p-4">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Tambah Tabungan
          </h3>

          <AddSavingForm
            personOne={String(room.person_one)}
            personTwo={String(room.person_two)}
          />
        </div>

        <div className="rounded-2xl border border-pink-100 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">
              Riwayat Terbaru
            </h3>
            <span className="text-xs text-pink-500">
              {transactions.rows.length} transaksi
            </span>
          </div>

          <div className="space-y-3">
            {transactions.rows.length === 0 ? (
              <div className="rounded-xl bg-pink-50 p-4 text-center text-sm text-gray-500">
                Transaksi pertama kalian akan muncul di sini 💕
              </div>
            ) : (
              transactions.rows.map((transaction, index) => (
                <div
                  key={`${transaction.created_at}-${index}`}
                  className="flex items-start justify-between rounded-xl border border-pink-50 bg-pink-50/40 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {String(transaction.person)} menabung
                    </p>

                    {transaction.note && (
                      <p className="mt-1 text-xs text-gray-500">
                        {String(transaction.note)}
                      </p>
                    )}
                  </div>

                  <p className="ml-3 text-sm font-semibold text-pink-600">
                    +{formatRupiah(Number(transaction.amount))}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </MobileContainer>
  )
}
