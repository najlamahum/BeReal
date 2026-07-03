import { ChevronDown } from 'lucide-react'

export function BackButton({ onClick, size = 40, className = 'absolute left-4 top-1/2 z-20 -translate-y-1/2' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to friends"
      style={{ width: size, height: size }}
      className={
        className +
        ' flex items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-[20px]'
      }
    >
      <ChevronDown size={22} className="text-bereal-ink" />
    </button>
  )
}
