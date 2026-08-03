type MobileContainerProps = {
  children: React.ReactNode
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-white shadow-sm">
      {children}
    </div>
  )
}
