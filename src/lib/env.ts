export const env = {
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL ?? '',
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN ?? '',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? '',
}

export function validateEnv() {
  const missing: string[] = []

  if (!env.TURSO_DATABASE_URL) missing.push('TURSO_DATABASE_URL')
  if (!env.TURSO_AUTH_TOKEN) missing.push('TURSO_AUTH_TOKEN')

  if (missing.length > 0) {
    throw new Error(`Environment variable belum lengkap: ${missing.join(', ')}`)
  }
}
