type ErrorCardProps = {
  message: string
}

export function ErrorCard({ message }: ErrorCardProps) {
  return (
    <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
      {message}
    </div>
  )
}
