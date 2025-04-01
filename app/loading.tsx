export default function Loading() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  )
} 