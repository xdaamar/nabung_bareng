'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getSessionRoomId } from '@/lib/auth'

export async function addSavingAction(formData: FormData) {
  const roomId = await getSessionRoomId()

  if (!roomId) {
    throw new Error('Session tidak ditemukan')
  }

  const person = formData.get('person')?.toString() ?? ''
  const amount = Number(formData.get('amount'))
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
