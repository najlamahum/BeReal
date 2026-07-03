import { Minus, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import mapImage from '../../assets/mock-map.png'
import { MapCounterScale } from './MapCounterScale'
import { MapPin } from './MapPin'
import { NewNoteBadge } from './NewNoteBadge'
import { ProximityPopup } from './ProximityPopup'
import { RevealedNotePopup } from './RevealedNotePopup'

// Positions are percentages of the map image's own box (not the screen),
// hand-picked to land on solid ground in mock-map.png (Oakland/Berkeley
// on the east bay, San Francisco on the peninsula) — not over water.
// Percentages (rather than fixed px) keep pins correctly anchored to the
// map regardless of scale, since they're resolved against the transformed
// content's own layout box.
const PLAIN_PINS = [
  { left: '79.6%', top: '45.07%' }, // Oakland
  { left: '72.39%', top: '33.52%' }, // Berkeley
]

const NOTE_PIN = { left: '48.26%', top: '49.9%' } // San Francisco, near city center

const PROXIMITY_POPUP_DURATION_MS = 1500

export function FriendsMap({
  onOpenNote,
  showRevealedPopup,
  onDismissRevealedPopup,
  hideNoteBadge,
}) {
  const [showPopup, setShowPopup] = useState(false)
  const timerRef = useRef(null)

  function advanceToAR() {
    clearTimeout(timerRef.current)
    setShowPopup(false)
    onOpenNote()
  }

  useEffect(() => {
    if (!showPopup) return
    timerRef.current = setTimeout(advanceToAR, PROXIMITY_POPUP_DURATION_MS)
    return () => clearTimeout(timerRef.current)
    // advanceToAR is stable enough here — only showPopup should retrigger this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopup])

  return (
    <div className="relative min-h-0 flex-1 w-full overflow-hidden rounded-[25px] bg-white">
      {/* minScale=1: the image is already sized via object-cover to fill
          the container exactly at scale 1, so zooming out any further
          would shrink it below the container and reveal whitespace. */}
      <TransformWrapper initialScale={1} minScale={1} maxScale={4} centerOnInit>
        {({ zoomIn, zoomOut }) => (
          <>
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
              contentStyle={{ width: '100%', height: '100%' }}
            >
              <div className="relative h-full w-full">
                <img
                  src={mapImage}
                  alt=""
                  draggable={false}
                  className="h-full w-full object-cover"
                />
                {/* MapCounterScale reactively applies scale(1/currentScale)
                    pivoted on the top-left anchor corner, counteracting the
                    ambient zoom from TransformComponent so each pin stays a
                    constant on-screen size while its left/top position
                    still tracks the map correctly. Used for the popups too
                    (below) — same component, same origin convention — so
                    a pin and its popup always agree on where "anchor" is,
                    at any zoom level. (Not the library's own <KeepScale>,
                    which pivots on center — fine alone, but inconsistent
                    once paired with a differently-sized sibling.) */}
                {PLAIN_PINS.map((pos, i) => (
                  <MapCounterScale key={i} style={{ left: pos.left, top: pos.top }}>
                    <MapPin />
                  </MapCounterScale>
                ))}
                <MapCounterScale style={{ left: NOTE_PIN.left, top: NOTE_PIN.top }}>
                  <MapPin variant="note" onClick={() => setShowPopup(true)} />
                </MapCounterScale>

                {/* Anchored at the EXACT same content-space point as the
                    pin (not offset via calc()) — the 45px gap is applied
                    as a fixed-pixel translate inside each popup's own
                    root, composing with MapCounterScale's counter-scale
                    so it stays a constant 45 screen-pixels regardless of
                    zoom, rather than drifting proportionally to scale. */}
                {showPopup && (
                  <MapCounterScale style={{ left: NOTE_PIN.left, top: NOTE_PIN.top, zIndex: 20 }}>
                    <ProximityPopup onClick={advanceToAR} />
                  </MapCounterScale>
                )}
                {showRevealedPopup && (
                  <MapCounterScale style={{ left: NOTE_PIN.left, top: NOTE_PIN.top, zIndex: 20 }}>
                    <RevealedNotePopup onDismiss={onDismissRevealedPopup} />
                  </MapCounterScale>
                )}
              </div>
            </TransformComponent>

            {!hideNoteBadge && <NewNoteBadge onClick={() => setShowPopup(true)} />}

            <div className="absolute bottom-[90px] right-6 z-10 flex flex-col items-center gap-1 rounded-lg border border-bereal-muted bg-white px-1 py-2">
              <button type="button" onClick={() => zoomIn()} aria-label="Zoom in">
                <Plus size={20} className="text-black" />
              </button>
              <div className="h-px w-4 bg-bereal-muted" />
              <button type="button" onClick={() => zoomOut()} aria-label="Zoom out">
                <Minus size={20} className="text-black" />
              </button>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  )
}
