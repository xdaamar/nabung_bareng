'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createLoanAction } from '@/actions/loan.actions'
import { LoadingOverlay } from '@/components/ui/loading-overlay'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending && <LoadingOverlay text="Menyimpan pinjaman 💸" />}

      <button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-2xl bg-pink-500 px-4 font-semibold text-white transition active:scale-[0.98] disabled:opacity-50"
      >
        {pending ? 'Menyimpan...' : 'Simpan Pinjaman 💸'}
      </button>
    </>
  )
}

function formatDots(val: string | number): string {
  const digits = String(val).replace(/\D/g, '')
  if (!digits) return ''
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function CreateLoanForm({
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
    await createLoanAction(formData)
    setAmountStr('')
  }

  return (
    <form action={handleFormAction} className="space-y-3 rounded-2xl border border-pink-100 bg-white p-4">
      <select
        name="borrower"
        required
        className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
      >
        <option value="">Pilih peminjam</option>
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
          placeholder="Nominal pinjaman (contoh: 50.000)"
          className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
        />
        <input
          type="hidden"
          name="amount"
          value={amountStr.replace(/\D/g, '')}
        />
      </div>

      <textarea
        name="purpose"
        rows={3}
        required
        placeholder="Dipakai untuk apa?"
        className="w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 py-3 outline-none focus:border-pink-300 focus:bg-white"
      />

      <SubmitButton />
    </form>
  )
}
