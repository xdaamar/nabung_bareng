import Link from 'next/link'
import { AppHeader } from '@/components/layout/app-header'
import { MobileContainer } from '@/components/layout/mobile-container'
import { CreateExpenseForm } from '@/components/forms/create-expense-form'
import { requireSession } from '@/lib/auth'
import { db } from '@/lib/db'

export default async function PemakaianPage() {
  const roomId = await requireSession()

  const roomResult = await db.execute({
    sql: 'SELECT person_one, person_two FROM rooms WHERE id = ?',
    args: [roomId],
  })

  const room = roomResult.rows[0]

  return (
    <MobileContainer>
      <AppHeader
        title="Pemakaian 🛍️"
        subtitle="Catat pengeluaran untuk kebutuhan berdua"
      />

      <div className="space-y-5 p-5">
        <CreateExpenseForm
          personOne={String(room.person_one)}
          personTwo={String(room.person_two)}
        />

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
