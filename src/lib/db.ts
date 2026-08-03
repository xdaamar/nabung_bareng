import { createClient } from '@libsql/client'

function getEnv(name: string) {
  const value = process.env[name]

  if (!value || value.trim() === '') {
    throw new Error(`Environment variable ${name} belum diatur`)
  }

  return value.trim()
}

const url = getEnv('TURSO_DATABASE_URL')
const authToken = getEnv('TURSO_AUTH_TOKEN')

if (!url.startsWith('libsql://') && !url.startsWith('file:')) {
  throw new Error(
    'TURSO_DATABASE_URL harus diawali dengan libsql://',
  )
}

export const db = createClient({
  url,
  authToken,
})
