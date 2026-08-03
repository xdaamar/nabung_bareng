import { db } from './db'

export async function initDB() {
  await db.batch([
    `
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_code TEXT UNIQUE NOT NULL,
      pin_hash TEXT NOT NULL,
      person_one TEXT NOT NULL,
      person_two TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    `,

    `
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER NOT NULL,
      type TEXT NOT NULL CHECK (
        type IN (
          'deposit',
          'loan',
          'loan_repayment',
          'shared_expense'
        )
      ),
      person TEXT NOT NULL,
      amount INTEGER NOT NULL CHECK (amount > 0),
      note TEXT,
      related_loan_id INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    `,

    `
    CREATE TABLE IF NOT EXISTS loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER NOT NULL,
      borrower TEXT NOT NULL,
      amount INTEGER NOT NULL CHECK (amount > 0),
      purpose TEXT NOT NULL,
      remaining_amount INTEGER NOT NULL CHECK (remaining_amount >= 0),
      status TEXT NOT NULL DEFAULT 'active' CHECK (
        status IN ('active', 'paid')
      ),
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    `,

    `
    CREATE TABLE IF NOT EXISTS saving_goals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      target_amount INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    `,

    `
    CREATE INDEX IF NOT EXISTS idx_transactions_room_created
    ON transactions(room_id, created_at DESC)
    `,

    `
    CREATE INDEX IF NOT EXISTS idx_loans_room_status
    ON loans(room_id, status)
    `,
  ])
}
