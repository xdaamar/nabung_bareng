'use client'

import { useFormStatus } from 'react-dom'
import { LoadingOverlay } from './loading-overlay'

type PrimaryButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  type?: 'button' | 'submit'
  onClick?: () => void
  loadingText?: string
}

export function PrimaryButton({
  children,
  disabled,
  type = 'button',
  onClick,
  loadingText = 'Memproses... 💕',
}: PrimaryButtonProps) {
  const { pending } = useFormStatus()
  const isLoading = type === 'submit' && pending

  return (
    <>
      {isLoading && <LoadingOverlay text={loadingText} />}

      <button
        type={type}
        onClick={onClick}
        disabled={disabled || isLoading}
        className="h-12 w-full rounded-2xl bg-pink-500 px-4 font-semibold text-white transition active:scale-[0.98] disabled:opacity-50"
      >
        {isLoading ? 'Memproses...' : children}
      </button>
    </>
  )
}
