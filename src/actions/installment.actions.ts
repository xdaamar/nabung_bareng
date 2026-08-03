'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { requireSession } from '@/lib/auth'

export async function payInstallmentAction(formData: FormData) {
  const roomId = await requireSession()

  const loanId = Number(formData.get('loanId'))
  const rawAmount =
    formData.get('amount')?.toString().replace(/\./g, '').replace(/,/g, '') ?? ''
  const amount = Number(rawAmount)

  if (!Number.isFinite(loanId) || !Number.isFinite(amount) || amount <= 0) {
    throw new Error('Data cicilan tidak valid')
  }

  const loanResult = await db.execute({
    sql: 'SELECT * FROM loans WHERE id = ? AND room_id = ?',
    args: [loanId, roomId],
  })

  const loan = loanResult.rows[0]

  if (!loan) {
    throw new Error('Pinjaman tidak ditemukan')
  }

  const remaining = Number(loan.remaining_amount) - amount

  await db.execute({
    sql: `
      UPDATE loans
      SET remaining_amount = ?,
          status = ?
      WHERE id = ?
    `,
    args: [
      remaining > 0 ? remaining : 0,
      remaining > 0 ? 'active' : 'paid',
      loanId,
    ],
  })

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
      VALUES (?, 'loan_repayment', ?, ?, ?, ?)
    `,
    args: [
      roomId,
      String(loan.borrower),
      amount,
      `Cicilan pinjaman #${loanId}`,
      loanId,
    ],
  })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/cicilan')
  revalidatePath('/dashboard/pinjam')
}
