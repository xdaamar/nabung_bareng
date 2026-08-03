'use client'

import { useState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { addSavingAction } from '@/actions/saving.actions'
import { LoadingOverlay } from '@/components/ui/loading-overlay'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending && <LoadingOverlay text="Menyimpan tabungan 💰" />}

      <button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-2xl bg-pink-500 px-4 font-semibold text-white transition active:scale-[0.98] disabled:opacity-50"
      >
        {pending ? 'Menyimpan...' : 'Tambah Tabungan 💰'}
      </button>
    </>
  )
}

function formatDots(val: string | number): string {
  const digits = String(val).replace(/\D/g, '')
  if (!digits) return ''
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const LOCAL_STORAGE_KEY = 'nabung_bareng_recent_nominals'

export function AddSavingForm({
  personOne,
  personTwo,
  initialRecentAmounts = [],
}: {
  personOne: string
  personTwo: string
  initialRecentAmounts?: number[]
}) {
  const [amountStr, setAmountStr] = useState('')
  const [recentAmounts, setRecentAmounts] = useState<number[]>(initialRecentAmounts)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecentAmounts(parsed.slice(0, 2))
        }
      }
    } catch {
      // Abaikan error parse localStorage
    }
  }, [])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDots(e.target.value)
    setAmountStr(formatted)
  }

  const handleChipClick = (nominal: number) => {
    setAmountStr(formatDots(nominal))
  }

  const handleFormAction = async (formData: FormData) => {
    const rawDigits = amountStr.replace(/\D/g, '')
    const numericValue = Number(rawDigits)

    if (numericValue > 0) {
      const updated = [
        numericValue,
        ...recentAmounts.filter((n) => n !== numericValue),
      ].slice(0, 2)
      setRecentAmounts(updated)
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
      } catch {
        // Abaikan error localStorage
      }
    }

    // Replace formData amount with clean raw digits
    formData.set('amount', rawDigits)
    await addSavingAction(formData)
    setAmountStr('')
  }

  return (
    <form action={handleFormAction} className="space-y-3">
      <select
        name="person"
        required
        className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
      >
        <option value="">Pilih penabung</option>
        <option value={personOne}>{personOne}</option>
        <option value={personTwo}>{personTwo}</option>
      </select>

      <div className="space-y-1.5">
        <input
          type="text"
          inputMode="numeric"
          name="amountDisplay"
          required
          value={amountStr}
          onChange={handleAmountChange}
          placeholder="Nominal tabungan (contoh: 50.000)"
          className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
        />
        <input
          type="hidden"
          name="amount"
          value={amountStr.replace(/\D/g, '')}
        />

        {recentAmounts.length > 0 && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-gray-400">Terakhir:</span>
            <div className="flex flex-wrap gap-1.5">
              {recentAmounts.map((nominal) => (
                <button
                  key={nominal}
                  type="button"
                  onClick={() => handleChipClick(nominal)}
                  className="rounded-xl border border-pink-200 bg-pink-50 px-2.5 py-1 text-xs font-semibold text-pink-600 transition hover:bg-pink-100 active:scale-95"
                >
                  + Rp {formatDots(nominal)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <textarea
        name="note"
        rows={3}
        placeholder="Catatan (opsional)"
        className="w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 py-3 outline-none focus:border-pink-300 focus:bg-white"
      />

      <SubmitButton />
    </form>
  )
}
