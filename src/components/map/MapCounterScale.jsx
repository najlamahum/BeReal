import { useEffect, useRef } from 'react'
import { useTransformContext } from 'react-zoom-pan-pinch'

// Positions a child at a fixed content-space point and reactively applies
// transform: scale(1 / currentScale) to counteract the ambient map zoom —
// the same idea as the library's own <KeepScale>, but exposed as a plain
// element (not one that opaquely overwrites its own style.transform) so a
// child can layer its own translate(...) on top and have that translate
// compose *inside* the counter-scale. That ordering is what makes a fixed
// pixel gap next to another counter-scaled element (the pin) stay a
// constant screen-space distance at any zoom level, rather than drifting
// apart proportionally to scale.
export function MapCounterScale({ style, children }) {
  const instance = useTransformContext()
  const ref = useRef(null)

  useEffect(() => {
    return instance.onChange((ctx) => {
      if (ref.current) {
        ref.current.style.transform = `scale(${1 / ctx.instance.state.scale})`
      }
    })
  }, [instance])

  return (
    // transformOrigin '0 0': scaling must pivot around the anchor corner
    // (where left/top actually places the box), not the default center —
    // otherwise elements of different sizes (the small pin vs. this much
    // larger popup) drift apart as scale changes, since a center-pivoted
    // scale shifts the top-left corner by an amount proportional to the
    // element's own half-width/half-height.
    <div ref={ref} style={{ position: 'absolute', transformOrigin: '0 0', ...style }}>
      {children}
    </div>
  )
}
