import { useEffect, useRef, useState } from 'react'
import phoneSvg from '../../assets/Phone.svg'

// Phone.svg's native size and the screen cutout within it. These were
// re-derived by rasterizing the SVG and sampling alpha to find the actual
// opaque bezel boundary (avoiding the Dynamic Island and home-indicator
// decorations, which are separate opaque shapes floating inside the
// transparent screen area, not the frame edge itself) — the originally
// assumed (12, 12, 426, 904) was inaccurate and let content bleed under
// the real bottom bezel, which starts ~26px earlier than that.
const SHELL_WIDTH = 448
const SHELL_HEIGHT = 916
const SCREEN_X = 23
const SCREEN_Y = 26
const SCREEN_WIDTH = 403
const SCREEN_HEIGHT = 864
const SHELL_ASPECT = SHELL_WIDTH / SHELL_HEIGHT

// Every screen in this app is built against a fixed 402x874 canvas
// (matching the original pixel-perfect Figma frames).
const CANVAS_WIDTH = 402
const CANVAS_HEIGHT = 874

export function PhoneFrame({ children }) {
  const shellRef = useRef(null)
  const [shellPx, setShellPx] = useState(SHELL_WIDTH)

  // The frame image and the screen-cutout region are both sized as plain
  // CSS percentages of this same shellRef box, so the browser lays them
  // out and repaints them together in one pass — they can never drift
  // apart on resize the way two independently-transformed elements can.
  // ResizeObserver (not a window "resize" listener, which browsers
  // throttle/coalesce during a drag) is only needed to keep the *internal*
  // app canvas's fixed-pixel content scaled to match the cutout's actual
  // rendered size — it doesn't affect frame/cutout alignment at all.
  useEffect(() => {
    const el = shellRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      setShellPx(entries[0].contentRect.width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // The cutout's aspect ratio (426:904) isn't quite the same as the
  // canvas's (402:874), so scaling to fill the cutout's width would
  // overshoot its height (or vice versa) — must take the min of both
  // ratios, same as the original fixed-pixel implementation, just
  // re-derived from the live-measured shell width.
  const cutoutWidthPx = shellPx * (SCREEN_WIDTH / SHELL_WIDTH)
  const cutoutHeightPx = shellPx * (SCREEN_HEIGHT / SHELL_WIDTH)
  const canvasScale = Math.min(cutoutWidthPx / CANVAS_WIDTH, cutoutHeightPx / CANVAS_HEIGHT)

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-black p-4">
      <div
        ref={shellRef}
        style={{
          width: `min(${SHELL_WIDTH}px, 100%, calc((100dvh - 32px) * ${SHELL_ASPECT}))`,
          aspectRatio: `${SHELL_WIDTH} / ${SHELL_HEIGHT}`,
        }}
        className="relative"
      >
        {/* App content sits behind the SVG frame, clipped to the screen
            cutout — the frame overlay is pointer-events:none so it never
            blocks interactions with the content beneath it. Positioned in
            percentages of the same shell box the frame image fills, so
            the two are locked together as one unit at any size. */}
        <div
          style={{
            left: `${(SCREEN_X / SHELL_WIDTH) * 100}%`,
            top: `${(SCREEN_Y / SHELL_HEIGHT) * 100}%`,
            width: `${(SCREEN_WIDTH / SHELL_WIDTH) * 100}%`,
            height: `${(SCREEN_HEIGHT / SHELL_HEIGHT) * 100}%`,
          }}
          className="absolute overflow-hidden bg-black flex items-center justify-center"
        >
          <div
            style={{
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              transform: `scale(${canvasScale})`,
            }}
            className="relative shrink-0 bg-bereal-black"
          >
            {children}
          </div>
        </div>

        <img
          src={phoneSvg}
          alt=""
          className="pointer-events-none absolute left-0 top-0 z-30 h-full w-full"
        />
      </div>
    </div>
  )
}
