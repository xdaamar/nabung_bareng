'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { requireSession } from '@/lib/auth'

export async function createLoanAction(formData: FormData) {
  const roomId = await requireSession()

  const borrower = formData.get('borrower')?.toString() ?? ''
  const rawAmount =
    formData.get('amount')?.toString().replace(/\./g, '').replace(/,/g, '') ?? ''
  const amount = Number(rawAmount)
  const purpose = formData.get('purpose')?.toString() ?? ''

  if (!borrower || !purpose || !Number.isFinite(amount) || amount <= 0) {
    throw new Error('Data pinjaman tidak valid')
  }

  const loanResult = await db.execute({
    sql: `
      INSERT INTO loans (
        room_id,
        borrower,
        amount,
        purpose,
        remaining_amount
      )
      VALUES (?, ?, ?, ?, ?)
    `,
    args: [roomId, borrower, amount, purpose, amount],
  })

  const loanId = Number(loanResult.lastInsertRowid)

  await db.execute({
    sql: `
      INSERT INTO transactions (
        room_id,
        type,
        person,
        amount,
        note,
        related_loan_id
      )
      VALUES (?, 'loan', ?, ?, ?, ?)
    `,
    args: [roomId, borrower, amount, purpose, loanId],
  })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/pinjam')
  revalidatePath('/dashboard/cicilan')
}
