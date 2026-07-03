// Shared across every screen that shows the "Maya" name tag (AR note
// card, map proximity popup, map revealed popup) so padding/sizing stays
// in sync everywhere instead of drifting between copies.
// Left padding is intentionally 2px less than right: a solid circle
// (the avatar) reads as filling its padding more than text does, so equal
// CSS padding here still looked left-heavy — this is an optical, not
// literal, correction.
export function MayaPill({ size = 'sm' }) {
  const isLarge = size === 'lg'

  return (
    <div
      className={
        'flex items-center whitespace-nowrap rounded-full bg-black ' +
        (isLarge ? 'gap-1.5 py-1.5 pl-2.5 pr-3' : 'gap-1.5 py-1 pl-2 pr-2.5')
      }
    >
      <span
        className={
          'flex items-center justify-center rounded-full bg-white font-medium text-black ' +
          (isLarge ? 'h-[22px] w-[22px] text-[12px]' : 'h-4 w-4 text-[9px]')
        }
      >
        M
      </span>
      <span
        className={
          'font-medium text-white ' +
          (isLarge ? 'text-[14px] tracking-[-0.28px]' : 'text-[11px] tracking-[-0.22px]')
        }
      >
        Maya
      </span>
    </div>
  )
}
