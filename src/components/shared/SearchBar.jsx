import { Search } from 'lucide-react'

export function SearchBar({ placeholder = 'Add or search friends' }) {
  return (
    <div className="mx-4 flex items-center gap-3 rounded-full bg-bereal-surface px-4 py-3">
      <Search size={18} className="text-bereal-muted" />
      <span className="text-[15px] text-bereal-muted">{placeholder}</span>
    </div>
  )
}
