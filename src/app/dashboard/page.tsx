import dynamic from 'next/dynamic'
import { AppHeader } from '@/components/layout/app-header'
import { MobileContainer } from '@/components/layout/mobile-container'
import { AddSavingForm } from '@/components/forms/add-saving-form'
import { BalanceCard } from '@/components/dashboard/balance-card'
import { SavingsSummary } from '@/components/dashboard/savings-summary'
import { requireSession } from '@/lib/auth'
import { getDashboardData } from '@/lib/dashboard'

const QuickMenu = dynamic(
  () =>
    import('@/components/dashboard/quick-menu').then((m) => m.QuickMenu),
  {
    loading: () => (
      <div className="h-24 animate-pulse rounded-2xl bg-pink-100" />
    ),
  },
)

const TransactionList = dynamic(
  () =>
    import('@/components/dashboard/transaction-list').then(
      (m) => m.TransactionList,
    ),
  {
    loading: () => (
      <div className="h-32 animate-pulse rounded-2xl bg-pink-100" />
    ),
  },
)

export default async function DashboardPage() {
  const roomId = await requireSession()
  const { room, transactions, balance } = await getDashboardData(roomId)

  return (
    <MobileContainer>
      <AppHeader
        title="Tabungan Kita 💗"
        subtitle={`${String(room.person_one)} 💕 ${String(room.person_two)}`}
      />

      <div className="space-y-5 p-5">
        <BalanceCard balance={balance} />

        <SavingsSummary
          personOne={String(room.person_one)}
          personTwo={String(room.person_two)}
        />

        <div className="rounded-2xl border border-pink-100 bg-white p-4">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">
            Tambah Tabungan
          </h3>

          <AddSavingForm
            personOne={String(room.person_one)}
            personTwo={String(room.person_two)}
          />
        </div>

        <QuickMenu />

        <TransactionList
          transactions={transactions.map((transaction) => ({
            person: String(transaction.person),
            amount: Number(transaction.amount),
            note: transaction.note ? String(transaction.note) : null,
            created_at: String(transaction.created_at),
          }))}
        />

        <a
          href="/api/logout"
          className="block w-full rounded-2xl border border-pink-100 bg-white p-4 text-center text-sm font-medium text-gray-600"
        >
          Keluar 👋
        </a>
      </div>
    </MobileContainer>
  )
}
