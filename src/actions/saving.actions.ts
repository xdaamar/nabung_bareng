'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { requireSession } from '@/lib/auth'

export async function addSavingAction(formData: FormData) {
  const roomId = await requireSession()

  const person = formData.get('person')?.toString() ?? ''
  const rawAmount =
    formData.get('amount')?.toString().replace(/\./g, '').replace(/,/g, '') ?? ''
  const amount = Number(rawAmount)
  const note = formData.get('note')?.toString() ?? ''

  if (!person) {
    throw new Error('Penabung wajib dipilih')
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Nominal tabungan tidak valid')
  }

  if (amount > 1_000_000_000) {
    throw new Error('Nominal terlalu besar')
  }

  await db.execute({
    sql: `
      INSERT INTO transactions (room_id, type, person, amount, note)
      VALUES (?, 'deposit', ?, ?, ?)
    `,
    args: [roomId, person, amount, note],
  })

  revalidatePath('/dashboard')
}
