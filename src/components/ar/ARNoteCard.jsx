import { useState } from 'react'
import { Check, Lock, RefreshCw } from 'lucide-react'
import { MayaPill } from '../shared/MayaPill'
import backCamera from '../../assets/back_camera_1.png'
import frontCamera from '../../assets/frlont_camera_1.png'

const BACK_TEXT = 'This is a new feature I made on BeReal! Pretty cool right?'

// Purely presentational re: unlock state — the unlock trigger lives on the
// capture button in ARScreen, not on the card itself. Flip is local UI
// state though, since it's a self-contained interaction on the card once
// revealed (matches Figma's friends-6/7 "rotate" button).
//
// offset: device-orientation parallax in CSS px (ARScreen's live-camera
// mode only; {x:0,y:0} otherwise). Applied via the standalone CSS
// `translate` property rather than folding it into `transform`, so it
// composes additively with the -translate-x-1/2/-translate-y-1/2
// centering below instead of one clobbering the other. It's set on this
// outer wrapper — above the flip layer — so it applies to both faces,
// keeping the card "world-anchored" at the same spot whichever side is
// showing.
export function ARNoteCard({ state, offset = { x: 0, y: 0 } }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="absolute left-1/2 top-1/2 w-[134px] -translate-x-1/2 -translate-y-1/2"
      style={{ translate: `${offset.x}px ${offset.y}px` }}
    >
      <div className="mx-auto mb-2 w-fit">
        {state === 'success' ? (
          <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#F5C518] px-3 py-1.5">
            <Check size={14} className="text-black" />
            <span className="text-[14px] font-medium tracking-[-0.28px] text-black">
              success!
            </span>
          </div>
        ) : (
          <MayaPill size="lg" />
        )}
      </div>

      {/* perspective on the wrapper is what makes the child's rotateY
          read as a 3D flip instead of a flat horizontal squash */}
      <div className="relative h-[178.667px] w-[134px]" style={{ perspective: '800px' }}>
        <div
          className="relative h-full w-full transition-transform duration-500 ease-in-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* front */}
          <div
            className={
              'absolute inset-0 overflow-hidden rounded-[10px] ' +
              (state === 'revealed' ? 'bg-black border border-black' : 'bg-[#d9d9d9]')
            }
            style={{ backfaceVisibility: 'hidden' }}
          >
            {state === 'revealed' ? (
              <>
                <img
                  src={backCamera}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <img
                  src={frontCamera}
                  alt=""
                  className="absolute left-2 top-[7px] h-[75px] w-[56px] rounded-[6px] border border-black object-cover"
                />
              </>
            ) : (
              <>
                <div className="absolute left-2 top-[7px] h-[65px] w-[47px] rounded-[6px] bg-white" />
                <div
                  className="absolute bottom-0 right-0 h-[70px] w-[79px]"
                  style={{ background: '#000000', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
                />
                <Lock size={20} className="absolute bottom-2.5 right-2.5 text-white" />
              </>
            )}
          </div>

          {/* back */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[10px] bg-white px-3"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-left text-[13px] font-medium text-black">{BACK_TEXT}</p>
          </div>
        </div>

        {/* Sits outside the flipping layer (not inside the preserve-3d
            div) so it stays tappable and upright in both orientations. */}
        {state === 'revealed' && (
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            aria-label="Flip note"
            className="absolute bottom-[5px] right-[5px] z-10 flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white/20"
          >
            <RefreshCw size={16} className="text-black" />
          </button>
        )}
      </div>
    </div>
  )
}
