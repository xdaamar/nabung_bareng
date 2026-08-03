import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SESSION_KEY = 'couple-room'

export async function hashPin(pin: string) {
  return bcrypt.hash(pin, 10)
}

export async function verifyPin(pin: string, hash: string) {
  return bcrypt.compare(pin, hash)
}

export async function createSession(roomId: number) {
  const cookieStore = await cookies()

  cookieStore.set(SESSION_KEY, String(roomId), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
}

export async function getSessionRoomId() {
  const cookieStore = await cookies()
  const value = cookieStore.get(SESSION_KEY)?.value

  return value ? Number(value) : null
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_KEY)
}

export async function requireSession() {
  const roomId = await getSessionRoomId()

  if (!roomId) {
    redirect('/login')
  }

  return roomId
}
