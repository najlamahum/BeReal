import { SwitchCamera, ZapOff } from 'lucide-react'

export function CameraControls() {
  return (
    <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-between px-8">
      <ZapOff size={22} className="text-bereal-ink" />
      <span className="rounded-full bg-black/40 px-3 py-1 text-[13px] font-semibold text-bereal-ink">
        1x
      </span>
      <SwitchCamera size={22} className="text-bereal-ink" />
    </div>
  )
}
