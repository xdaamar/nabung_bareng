import { db } from './db'
import { getRoomBalance } from './balance'

export async function getDashboardData(roomId: number) {
  const [roomResult, transactionsResult, balance] = await Promise.all([
    db.execute({
      sql: `
        SELECT id, room_code, person_one, person_two
        FROM rooms
        WHERE id = ?
      `,
      args: [roomId],
    }),

    db.execute({
      sql: `
        SELECT id, person, amount, note, created_at
        FROM transactions
        WHERE room_id = ?
        ORDER BY created_at DESC
        LIMIT 5
      `,
      args: [roomId],
    }),

    getRoomBalance(roomId),
  ])

  return {
    room: roomResult.rows[0],
    transactions: transactionsResult.rows,
    balance,
  }
}
