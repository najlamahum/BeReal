import { useEffect, useState } from 'react'
import phoneSvg from '../../assets/Phone.svg'

// Phone.svg's native size and the screen cutout within it.
const SHELL_WIDTH = 448
const SHELL_HEIGHT = 916
const SCREEN_X = 12
const SCREEN_Y = 12
const SCREEN_WIDTH = 426
const SCREEN_HEIGHT = 904

// Every screen in this app is built against a fixed 402x874 canvas
// (matching the original pixel-perfect Figma frames). Rather than
// re-deriving every hardcoded position for the SVG frame's screen cutout,
// that canvas renders at its native size and gets scaled down by a small,
// constant factor to exactly fill the cutout.
const CANVAS_WIDTH = 402
const CANVAS_HEIGHT = 874
const CANVAS_SCALE = Math.min(SCREEN_WIDTH / CANVAS_WIDTH, SCREEN_HEIGHT / CANVAS_HEIGHT)

export function PhoneFrame({ children }) {
  const [shellScale, setShellScale] = useState(1)

  useEffect(() => {
    function updateScale() {
      const padding = 32 // breathing room so the shell never touches viewport edges
      const availableWidth = window.innerWidth - padding
      const availableHeight = window.innerHeight - padding
      setShellScale(Math.min(availableWidth / SHELL_WIDTH, availableHeight / SHELL_HEIGHT, 1))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-black">
      <div
        style={{
          width: SHELL_WIDTH,
          height: SHELL_HEIGHT,
          transform: `scale(${shellScale})`,
        }}
        className="relative"
      >
        {/* App content sits behind the SVG frame, clipped to the screen
            cutout — the frame overlay is pointer-events:none so it never
            blocks interactions with the content beneath it. */}
        <div
          style={{
            left: SCREEN_X,
            top: SCREEN_Y,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
          }}
          className="absolute overflow-hidden bg-black"
        >
          <div
            style={{
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              transform: `scale(${CANVAS_SCALE})`,
              transformOrigin: 'top left',
            }}
            className="relative bg-bereal-black"
          >
            {children}
          </div>
        </div>

        <img
          src={phoneSvg}
          alt=""
          width={SHELL_WIDTH}
          height={SHELL_HEIGHT}
          className="pointer-events-none absolute left-0 top-0 z-30"
        />
      </div>
    </div>
  )
}
