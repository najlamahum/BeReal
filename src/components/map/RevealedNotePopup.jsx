import { useEffect, useRef, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { MayaPill } from '../shared/MayaPill'
import backCamera from '../../assets/back_camera_1.png'
import frontCamera from '../../assets/frlont_camera_1.png'

const BACK_TEXT = 'This is a new feature I made on BeReal! Pretty cool right?'

// Shown on the map after exiting the AR view (Figma's friends-8/10): the
// note the user just unlocked, pinned near its location. Dismissed by
// tapping/clicking anywhere outside it — via a passive document listener,
// not an overlay element, so it never blocks pointer events from reaching
// the map underneath (react-zoom-pan-pinch's own drag/pinch handlers still
// see every touch normally).
// The 45px (pin's own constant 40px height + 5px gap) is applied here,
// inside the parent MapCounterScale's scale(1/currentScale) transform —
// composing in that order is what keeps it a constant 45 screen-pixels at
// any zoom level, instead of drifting with scale like a plain calc()
// position offset would.
export function RevealedNotePopup({ onDismiss }) {
  const [flipped, setFlipped] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    function handleOutsidePointer(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        onDismiss()
      }
    }
    document.addEventListener('mousedown', handleOutsidePointer)
    document.addEventListener('touchstart', handleOutsidePointer)
    return () => {
      document.removeEventListener('mousedown', handleOutsidePointer)
      document.removeEventListener('touchstart', handleOutsidePointer)
    }
  }, [onDismiss])

  return (
    <div
      ref={rootRef}
      className="flex flex-col items-center"
      style={{ transform: 'translate(-50%, calc(-100% - 45px))' }}
    >
      <div className="mb-1.5">
        <MayaPill size="sm" />
      </div>

      {/* perspective on the wrapper is what makes the child's rotateY
          read as a 3D flip instead of a flat horizontal squash */}
      <div className="relative h-[100px] w-[75px]" style={{ perspective: '500px' }}>
        <div
          className="relative h-full w-full transition-transform duration-500 ease-in-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-[10px] bg-black border border-black"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <img
              src={backCamera}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <img
              src={frontCamera}
              alt=""
              className="absolute left-1 top-1 h-[35px] w-[26px] rounded-[4px] border border-black object-cover"
            />
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[10px] bg-white px-1.5"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-left text-[8px] font-medium leading-tight text-black">
              {BACK_TEXT}
            </p>
          </div>
        </div>

        {/* Sits outside the flipping layer so it stays tappable and
            upright in both orientations. */}
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label="Flip note"
          className="absolute bottom-1 right-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-white/20"
        >
          <RefreshCw size={9} className="text-black" />
        </button>
      </div>
    </div>
  )
}
