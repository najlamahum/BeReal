import { useEffect } from 'react'
import { ARScanIcon } from '../components/ar/ARScanIcon'

const DURATION_MS = 1500

// Matches Figma's friends-11: a brief, minimal interstitial between the
// map's proximity popup and the AR unlocking view — no back button, just
// the title (repositioned lower, per the source frame) and a pulsing
// scan icon to sell "getting closer."
export function GettingCloserScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, DURATION_MS)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="relative flex h-full flex-col bg-bereal-black">
      <h1 className="absolute left-0 right-0 top-[285px] text-center text-[24px] font-medium tracking-[-0.48px] text-bereal-ink">
        BeReal.
      </h1>

      <div className="flex flex-1 items-center justify-center">
        <div className="animate-pulse">
          <ARScanIcon size={80} />
        </div>
      </div>
    </div>
  )
}
