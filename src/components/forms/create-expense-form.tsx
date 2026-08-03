'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createExpenseAction } from '@/actions/expense.actions'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="h-12 w-full rounded-2xl bg-pink-500 px-4 font-semibold text-white transition active:scale-[0.98] disabled:opacity-50"
    >
      {pending ? 'Menyimpan...' : 'Simpan Pengeluaran 🛍️'}
    </button>
  )
}

function formatDots(val: string | number): string {
  const digits = String(val).replace(/\D/g, '')
  if (!digits) return ''
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function CreateExpenseForm({
  personOne,
  personTwo,
}: {
  personOne: string
  personTwo: string
}) {
  const [amountStr, setAmountStr] = useState('')

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountStr(formatDots(e.target.value))
  }

  const handleFormAction = async (formData: FormData) => {
    const rawDigits = amountStr.replace(/\D/g, '')
    formData.set('amount', rawDigits)
    await createExpenseAction(formData)
    setAmountStr('')
  }

  return (
    <form action={handleFormAction} className="space-y-3 rounded-2xl border border-pink-100 bg-white p-4">
      <select
        name="person"
        required
        className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
      >
        <option value="">Siapa yang menggunakan?</option>
        <option value={personOne}>{personOne}</option>
        <option value={personTwo}>{personTwo}</option>
      </select>

      <div>
        <input
          type="text"
          inputMode="numeric"
          name="amountDisplay"
          required
          value={amountStr}
          onChange={handleAmountChange}
          placeholder="Nominal pengeluaran (contoh: 50.000)"
          className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
        />
        <input
          type="hidden"
          name="amount"
          value={amountStr.replace(/\D/g, '')}
        />
      </div>

      <textarea
        name="note"
        rows={3}
        required
        placeholder="Dipakai untuk apa? (contoh: makan, nonton, hadiah, bensin jalan bareng)"
        className="w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 py-3 outline-none focus:border-pink-300 focus:bg-white"
      />

      <SubmitButton />
    </form>
  )
}
