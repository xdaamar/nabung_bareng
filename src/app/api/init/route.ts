import { NextResponse } from 'next/server'
import { initDB } from '@/lib/init-db'

export async function GET() {
  await initDB()

  return NextResponse.json({
    success: true,
    message: 'Database initialized successfully',
  })
}
