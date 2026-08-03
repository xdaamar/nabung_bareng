import { db } from './db'

export async function getRoomBalance(roomId: number) {
  const result = await db.execute({
    sql: `
      SELECT COALESCE(
        SUM(
          CASE
            WHEN type IN ('deposit', 'loan_repayment')
              THEN amount
            WHEN type IN ('loan', 'shared_expense')
              THEN -amount
          END
        ),
        0
      ) AS balance
      FROM transactions
      WHERE room_id = ?
    `,
    args: [roomId],
  })

  return Number(result.rows[0]?.balance ?? 0)
}
