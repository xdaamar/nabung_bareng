type AppHeaderProps = {
  title: string
  subtitle?: string
}

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-rose-400 px-5 pb-6 pt-8 text-white">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 p-1.5 shadow-sm">
          <img
            src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis@master/Emojis/Smilies/Sparkling%20Heart.png"
            alt="Couple Saving Heart"
            className="h-5 w-5 object-contain drop-shadow-sm"
          />
        </div>
        <span className="text-sm font-medium">Couple Saving</span>
      </div>

      <h1 className="text-2xl font-bold">{title}</h1>

      {subtitle && (
        <p className="mt-1 text-sm text-pink-100">{subtitle}</p>
      )}
    </div>
  )
}
