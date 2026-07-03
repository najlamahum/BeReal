import { useEffect, useState } from 'react'

const OFFSET_CLAMP_PX = 60
const TILT_CENTER_DEG = 45 // beta ~45deg = phone held up at a natural viewing angle

// Subtle parallax from device tilt — not real world tracking, just enough
// motion (clamped so the card can't drift off-card) to read as "floating
// in space" as the user tilts the phone. enabled is gated by the caller
// on isMobile + permission state, so this hook stays a no-op otherwise.
export function useDeviceOrientationParallax(enabled) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) {
      setOffset({ x: 0, y: 0 })
      return
    }

    function handleOrientation(event) {
      const { beta, gamma } = event
      if (beta == null || gamma == null) return
      const rawX = gamma * 2
      const rawY = (beta - TILT_CENTER_DEG) * 2
      setOffset({
        x: Math.max(-OFFSET_CLAMP_PX, Math.min(OFFSET_CLAMP_PX, rawX)),
        y: Math.max(-OFFSET_CLAMP_PX, Math.min(OFFSET_CLAMP_PX, rawY)),
      })
    }

    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [enabled])

  return offset
}
