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
        <div className="mt-1 flex items-center gap-1.5">
          <span className="text-lg font-bold text-gray-800">Aktif</span>
          <img
            src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis@master/Emojis/Smilies/Growing%20Heart.png"
            alt="Aktif"
            className="h-5 w-5 object-contain drop-shadow-sm"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-4">
        <p className="text-xs text-gray-500">{personTwo}</p>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="text-lg font-bold text-gray-800">Aktif</span>
          <img
            src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis@master/Emojis/Smilies/Growing%20Heart.png"
            alt="Aktif"
            className="h-5 w-5 object-contain drop-shadow-sm"
          />
        </div>
      </div>
    </div>
  )
}
