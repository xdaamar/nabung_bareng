import { addSavingAction } from '@/actions/saving.actions'
import { PrimaryButton } from '@/components/ui/primary-button'

type AddSavingFormProps = {
  personOne: string
  personTwo: string
}

export function AddSavingForm({
  personOne,
  personTwo,
}: AddSavingFormProps) {
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

      <PrimaryButton type="submit">Tambah Tabungan 💰</PrimaryButton>
    </form>
  )
}
