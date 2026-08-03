'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { requireSession } from '@/lib/auth'

export async function createExpenseAction(formData: FormData) {
  const roomId = await requireSession()

  const person = formData.get('person')?.toString() ?? ''
  const rawAmount =
    formData.get('amount')?.toString().replace(/\./g, '').replace(/,/g, '') ?? ''
  const amount = Number(rawAmount)
  const note = formData.get('note')?.toString() ?? ''

  if (!person || !note || !Number.isFinite(amount) || amount <= 0) {
    throw new Error('Data pemakaian tidak valid')
  }

  await db.execute({
    sql: `
      INSERT INTO transactions (
        room_id,
        type,
        person,
        amount,
        note
      )
      VALUES (?, 'shared_expense', ?, ?, ?)
    `,
    args: [roomId, person, amount, note],
  })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/pemakaian')
}
