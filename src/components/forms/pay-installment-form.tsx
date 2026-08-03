'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { payInstallmentAction } from '@/actions/installment.actions'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="h-12 w-full rounded-2xl bg-pink-500 px-4 font-semibold text-white transition active:scale-[0.98] disabled:opacity-50"
    >
      {pending ? 'Menyimpan...' : 'Bayar Cicilan 💖'}
    </button>
  )
}

function formatDots(val: string | number): string {
  const digits = String(val).replace(/\D/g, '')
  if (!digits) return ''
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function PayInstallmentForm({
  loanId,
  borrower,
  purpose,
  remainingAmount,
}: {
  loanId: number
  borrower: string
  purpose: string
  remainingAmount: number
}) {
  const [amountStr, setAmountStr] = useState('')

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountStr(formatDots(e.target.value))
  }

  const handleFormAction = async (formData: FormData) => {
    const rawDigits = amountStr.replace(/\D/g, '')
    formData.set('amount', rawDigits)
    await payInstallmentAction(formData)
    setAmountStr('')
  }

  return (
    <form
      action={handleFormAction}
      className="space-y-3 rounded-2xl border border-pink-100 bg-white p-4"
    >
      <input type="hidden" name="loanId" value={loanId} />

      <div>
        <p className="text-sm font-semibold text-gray-800">{borrower}</p>
        <p className="text-xs text-gray-500">{purpose}</p>
        <p className="mt-2 text-sm font-medium text-pink-600">
          Sisa pinjaman: Rp {remainingAmount.toLocaleString('id-ID')}
        </p>
      </div>

      <div>
        <input
          type="text"
          inputMode="numeric"
          name="amountDisplay"
          required
          value={amountStr}
          onChange={handleAmountChange}
          placeholder="Nominal cicilan (contoh: 25.000)"
          className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
        />
        <input
          type="hidden"
          name="amount"
          value={amountStr.replace(/\D/g, '')}
        />
      </div>

      <SubmitButton />
    </form>
  )
}
