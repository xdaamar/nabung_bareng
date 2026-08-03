'use client'

import { useFormStatus } from 'react-dom'
import { addSavingAction } from '@/actions/saving.actions'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="h-12 w-full rounded-2xl bg-pink-500 px-4 font-semibold text-white transition active:scale-[0.98] disabled:opacity-50"
    >
      {pending ? 'Menyimpan...' : 'Tambah Tabungan 💰'}
    </button>
  )
}

export function AddSavingForm({
  personOne,
  personTwo,
}: {
  personOne: string
  personTwo: string
}) {
  return (
    <form action={addSavingAction} className="space-y-3">
      <select
        name="person"
        required
        className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
      >
        <option value="">Pilih penabung</option>
        <option value={personOne}>{personOne}</option>
        <option value={personTwo}>{personTwo}</option>
      </select>

      <input
        name="amount"
        type="number"
        required
        placeholder="Nominal tabungan"
        className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/60 px-4 outline-none focus:border-pink-300 focus:bg-white"
      />

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
