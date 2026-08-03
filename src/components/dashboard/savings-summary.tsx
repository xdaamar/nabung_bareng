type SavingsSummaryProps = {
  personOne: string
  personTwo: string
}

export function SavingsSummary({
  personOne,
  personTwo,
}: SavingsSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-pink-100 bg-white p-4">
        <p className="text-xs text-gray-500">{personOne}</p>
        <p className="mt-1 text-lg font-bold text-gray-800">Aktif 💕</p>
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-4">
        <p className="text-xs text-gray-500">{personTwo}</p>
        <p className="mt-1 text-lg font-bold text-gray-800">Aktif 💕</p>
      </div>
    </div>
  )
}
