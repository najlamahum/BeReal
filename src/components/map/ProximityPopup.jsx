import { Lock } from 'lucide-react'
import { MayaPill } from '../shared/MayaPill'

// Matches Figma's friends-2: a gold "Travel Xm to unlock" pill above a
// small locked-note preview bubble, appearing near the pin the user just
// tapped — an overlay on the map itself, not a screen change. Tapping the
// card advances straight to the AR flow (rather than only via the
// auto-advance timer in FriendsMap).
// The 45px (pin's own constant 40px height + 5px gap) is applied here,
// inside the parent MapCounterScale's scale(1/currentScale) transform —
// composing in that order is what keeps it a constant 45 screen-pixels at
// any zoom level, instead of drifting with scale like a plain calc()
// position offset would.
export function ProximityPopup({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center"
      style={{ transform: 'translate(-50%, calc(-100% - 45px))' }}
    >
      <div className="mb-2 rounded-full bg-[#F5C518] px-4 py-1">
        <span className="text-[12px] font-medium tracking-[-0.24px] text-black">
          Travel 5m to unlock
        </span>
      </div>

      <div className="mb-1.5">
        <MayaPill size="sm" />
      </div>

      <div className="relative h-[100px] w-[75px] overflow-hidden rounded-[10px] bg-[#d9d9d9]">
        <div className="absolute left-1.5 top-1.5 h-9 w-6 rounded-[6px] bg-white" />
        <div
          className="absolute bottom-0 right-0 h-[52px] w-[44px]"
          style={{ background: '#000000', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
        />
        <Lock size={14} className="absolute bottom-1.5 right-1.5 text-white" />
      </div>
    </button>
  )
}
