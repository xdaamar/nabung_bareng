type PrimaryButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  type?: 'button' | 'submit'
  onClick?: () => void
}

export function PrimaryButton({
  children,
  disabled,
  type = 'button',
  onClick,
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="h-12 w-full rounded-2xl bg-pink-500 px-4 font-semibold text-white transition active:scale-[0.98] disabled:opacity-50"
    >
      {children}
    </button>
  )
}
