import { Flag } from 'lucide-react'

export function NewNoteBadge({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-6 top-5 z-10 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-md"
    >
      <Flag size={12} className="fill-red-600 text-red-600" />
      <span className="text-[12px] font-medium tracking-[-0.24px] text-black">
        1 new note
      </span>
    </button>
  )
}
