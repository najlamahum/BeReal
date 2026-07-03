import { useEffect, useState } from 'react'

const CANVAS_WIDTH = 402
const CANVAS_HEIGHT = 874

// On a real phone there's no need for the decorative bezel/dynamic-island
// mockup PhoneFrame renders for desktop preview — the device itself is
// already phone-shaped. This just needs to fill the real viewport with
// no scrolling.
//
// Every screen in this app was built against a fixed 402x874 canvas
// (matching the pixel-perfect Figma frames). Real devices vary in exact
// viewport size, so rather than re-deriving every hardcoded position as a
// fluid/relative unit (high-risk across ~15 already pixel-matched
// components), this renders that same fixed canvas and scales it down
// with a CSS transform to fit whatever the real viewport is — height is
// 100dvh (not 100vh) specifically so Safari's collapsible address bar
// doesn't cause a layout jump, and the scale factor is recalculated on
// resize/orientation change.
export function MobileViewport({ children }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    function updateScale() {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight
      const viewportWidth = window.innerWidth
      setScale(Math.min(viewportWidth / CANVAS_WIDTH, viewportHeight / CANVAS_HEIGHT))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    window.visualViewport?.addEventListener('resize', updateScale)
    return () => {
      window.removeEventListener('resize', updateScale)
      window.visualViewport?.removeEventListener('resize', updateScale)
    }
  }, [])

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-black">
      <div
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `scale(${scale})`,
        }}
        className="relative overflow-hidden bg-bereal-black"
      >
        {children}
      </div>
    </div>
  )
}
