'use server'

import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { hashPin, verifyPin, createSession } from '@/lib/auth'

export async function createRoomAction(formData: FormData) {
  const roomCode = formData.get('roomCode')?.toString().trim() ?? ''
  const pin = formData.get('pin')?.toString().trim() ?? ''
  const personOne = formData.get('personOne')?.toString().trim() ?? ''
  const personTwo = formData.get('personTwo')?.toString().trim() ?? ''

  if (!roomCode || !pin || !personOne || !personTwo) {
    throw new Error('Semua field wajib diisi')
  }

  const existing = await db.execute({
    sql: 'SELECT id FROM rooms WHERE room_code = ?',
    args: [roomCode],
  })

  if (existing.rows.length > 0) {
    throw new Error('Kode tabungan sudah digunakan')
  }

  const pinHash = await hashPin(pin)

  const result = await db.execute({
    sql: `
      INSERT INTO rooms (room_code, pin_hash, person_one, person_two)
      VALUES (?, ?, ?, ?)
    `,
    args: [roomCode, pinHash, personOne, personTwo],
  })

  await createSession(Number(result.lastInsertRowid))

  redirect('/dashboard')
}

export async function loginAction(formData: FormData) {
  const roomCode = formData.get('roomCode')?.toString().trim() ?? ''
  const pin = formData.get('pin')?.toString().trim() ?? ''

  const result = await db.execute({
    sql: 'SELECT * FROM rooms WHERE room_code = ?',
    args: [roomCode],
  })

  const room = result.rows[0]

  if (!room) {
    throw new Error('Kode tabungan tidak ditemukan')
  }

  const valid = await verifyPin(pin, String(room.pin_hash))

  if (!valid) {
    throw new Error('PIN salah')
  }

  await createSession(Number(room.id))

  redirect('/dashboard')
}
