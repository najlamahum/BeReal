import { useEffect, useState } from 'react'
import ob2Image3 from '../assets/onboarding/ob2-image3.png'
import ob2ProgressDots from '../assets/onboarding/ob2-progress-dots.svg'
import ob2PencilIcon from '../assets/onboarding/ob2-pencil-icon.svg'
import ob3ZoomPlus from '../assets/onboarding/ob3-zoom-plus.svg'
import ob3Map from '../assets/onboarding/ob3-map.png'
import ob3ProgressDots from '../assets/onboarding/ob3-progress-dots.svg'
import ob3Divider from '../assets/onboarding/ob3-divider.svg'
import ob3NotePin from '../assets/onboarding/ob3-note-pin.svg'
import ob3FlagVector from '../assets/onboarding/ob3-flag-vector.svg'
import ob4Image6 from '../assets/onboarding/ob4-image6.png'
import ob4ProgressDots from '../assets/onboarding/ob4-progress-dots.svg'
import ob4BenAvatar from '../assets/onboarding/ob4-ben-avatar.svg'
import ob4RotateIcon from '../assets/onboarding/ob4-rotate-icon.svg'

// Figma file kiOnFUGbYG8MaFN7mROyuR, page "v2", frames "Onboarding - 1"
// through "Onboarding - 4" (node ids 230:263, 230:378, 230:276, 230:351,
// 230:401). Every asset here (photos, map, icons, progress-dot states) is
// downloaded straight from those frames — nothing recreated by hand.
const SPLASH_DURATION_MS = 800
// Onboarding - 1.1's total hold time before its exit transition starts.
const SUBTITLE_DURATION_MS = 1000

// Figma's actual Onboarding - 4 frame reads "Continue" (not "Get
// Started") on its button — it differs from the outline style used on
// slides 2/3 only by being solid white with black text. Kept as-is per
// the file rather than substituting different copy.
const CONTINUE_LABEL = 'Continue'

function SlideChrome({ showSkip, onSkip, onContinue, isLastSlide, progressDots }) {
  return (
    <>
      {/* This screen's own title, independent of the splash/1.1 title —
          the 1.1 -> 2 change is an instant hard cut (no shared element,
          no transition), so this just appears the moment the slide
          mounts. */}
      <h1 className="absolute left-0 right-0 top-[80px] text-center text-[24px] font-medium leading-none tracking-[-0.48px] text-white">
        BeReal.
      </h1>
      {showSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="absolute left-[374.5px] top-[85px] w-[33px] -translate-x-1/2 text-center text-[16px] font-medium leading-none tracking-[-0.32px] text-[#969696]"
        >
          Skip
        </button>
      )}
      <button
        type="button"
        onClick={onContinue}
        className={
          'absolute left-[17px] top-[768px] flex h-[58px] w-[370px] items-center justify-center rounded-[18px] border border-white ' +
          (isLastSlide ? 'bg-white' : 'bg-transparent')
        }
      >
        <span
          className={
            'text-[16px] font-semibold leading-none tracking-[-0.32px] ' +
            (isLastSlide ? 'text-black' : 'text-white')
          }
        >
          {CONTINUE_LABEL}
        </span>
      </button>
      <img src={progressDots} alt="" className="absolute left-[180px] top-[736px] h-[10px] w-[44px]" />
    </>
  )
}

// Onboarding - 2 (node 230:276): "Attach Notes to your BeReal Photo"
function Slide2Visual() {
  return (
    <>
      {/* rounded-t- (top corners only), not all four — the bottom of
          this card always fades to solid black via the vignette below,
          matching the page background exactly, so a square bottom edge
          there is visually identical to a rounded one but has no curve
          for the browser to anti-alias against that solid-black fill,
          which is what caused a faint seam artifact at the rounded
          corner under this app's non-integer canvas scale. */}
      <div className="absolute left-[74px] top-[184px] h-[342px] w-[256.5px] overflow-hidden rounded-[20px]">
        <div className="absolute inset-0 bg-[#d9d9d9]" />
        <img
          src={ob2Image3}
          alt=""
          className="absolute left-[-18.97%] top-[-60.81%] w-[122.37%] max-w-none h-[165.2%] object-cover"
        />
      </div>
      <div className="absolute left-[89.55px] top-[196.95px] h-[124.364px] w-[90.682px] overflow-hidden rounded-[6px] border border-black">
        <div className="absolute inset-0 bg-white" />
        <img
          src={ob2Image3}
          alt=""
          className="absolute left-[-11.7%] top-[-3.75%] w-[277.93%] max-w-none h-[313.54%] object-cover"
        />
      </div>
      <button
        type="button"
        className="absolute left-[227px] top-[197px] flex h-[40px] w-[127px] items-center justify-center gap-1.5 rounded-[41px] bg-white"
      >
        <img src={ob2PencilIcon} alt="" className="h-[20px] w-[20px]" />
        <span className="text-[14px] font-medium tracking-[-0.28px] text-black">Add Note</span>
      </button>
      {/* Full-width vignette, edge to edge across the whole screen — not
          clipped to the (narrower) photo card. Sits as its own sibling on
          top of everything above, not nested inside the card, and has no
          border-radius of its own, so there's no curved edge to pick up
          a rendering seam the way a clipped/rounded overlay could. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[404px] bottom-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, black 16%)' }}
      />
      <p className="absolute bottom-[381px] left-[39px] w-[334px] translate-y-full text-[40px] font-semibold leading-[1.2] tracking-[-0.8px] text-white">
        Attach Notes to your BeReal Photo
      </p>
    </>
  )
}

// Onboarding - 3 (node 230:351): "Drop a Note. Let friends know where you are"
function Slide3Visual() {
  return (
    <>
      <div className="absolute left-[73px] top-[184px] h-[433px] w-[257px] overflow-hidden rounded-[25px]">
        <div className="absolute left-0 top-0 h-[537px] w-[402px] rounded-[25px] bg-white" />
        <div className="absolute left-0 top-0 h-[537px] w-[402px] overflow-hidden rounded-[25px]">
          <img
            src={ob3Map}
            alt=""
            className="absolute left-[-882px] top-[-82px] w-[1396px] max-w-none h-[1283px] object-bottom"
          />
          <div className="absolute bottom-[40px] right-[24px] flex flex-col items-center gap-1 rounded-[8px] border border-[#b6b9bf] bg-white px-1 py-2">
            <img src={ob3ZoomPlus} alt="" className="h-[24px] w-[24px]" />
            <img src={ob3Divider} alt="" className="h-px w-[16px]" />
            <div className="relative h-[24px] w-[24px]">
              <div className="absolute inset-[45.83%_16.67%] rounded-[4px] bg-black" />
            </div>
          </div>
        </div>
      </div>
      {/* Figma's own box for this is percentage-inset (38.36/42.33/54.19/
          44.06%); using inset-[] directly left width/height on "auto",
          and browsers size an <img> with ambiguous intrinsic dimensions
          to the CSS default replaced-element size (300x150) in that case
          instead of stretching to fill — explicit left/top/width/height
          avoids that entirely. */}
      <img
        src={ob3NotePin}
        alt=""
        className="absolute left-[177px] top-[335px] h-[65px] w-[55px]"
      />
      <div className="absolute left-[242px] top-[172px] flex h-[34px] w-[118px] items-center justify-center gap-1 rounded-[39px] bg-white">
        <img src={ob3FlagVector} alt="" className="h-[11px] w-[11px]" />
        <span className="text-[12px] font-medium tracking-[-0.24px] text-black">1 new note</span>
      </div>
      {/* Full-width vignette — see Slide2Visual's equivalent for why this
          is its own sibling, full screen width, rather than clipped to
          the (narrower) card. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[404px] bottom-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, black 16%)' }}
      />
      <p className="absolute bottom-[381px] left-[39px] w-[334px] translate-y-full text-[40px] font-semibold leading-[1.2] tracking-[-0.8px] text-white">
        Drop the Note for your friends to explore
      </p>
    </>
  )
}

// Onboarding - 4 (node 230:401): "Friends find your note in the real world"
function Slide4Visual() {
  return (
    <>
      <div className="absolute left-[77px] top-[184px] h-[374px] w-[253px] overflow-hidden rounded-[25px]">
        <div className="absolute left-0 top-0 h-[537px] w-[402px] rounded-[20px] bg-[#d9d9d9]" />
        <img
          src={ob4Image6}
          alt=""
          className="absolute left-[-54px] top-[-87px] w-[321px] max-w-none h-[428px] object-cover"
        />
      </div>
      {/* Full-width vignette — see Slide2Visual's equivalent for why this
          is its own sibling, full screen width, rather than clipped to
          the (narrower) card. Sits above the photo but below the white
          note card, so the note card itself stays undarkened. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[404px] bottom-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, black 16%)' }}
      />
      <div className="absolute left-[139px] top-[318.61px] h-[178.67px] w-[134px] rounded-[10px] bg-white">
        <p className="absolute left-[15px] top-[15.4px] w-[105px] text-[14px] font-medium leading-none tracking-[-0.28px] text-black">
          This was our favourite biking spot! We should go together next time you're free
        </p>
        <img src={ob4RotateIcon} alt="" className="absolute bottom-[8px] right-[8px] h-[35px] w-[35px]" />
      </div>
      <div className="absolute left-[170px] top-[280px] flex h-[30px] w-[65px] items-center gap-1 rounded-[16px] bg-black pl-1">
        <div className="relative h-[21.657px] w-[21.657px]">
          <img src={ob4BenAvatar} alt="" className="absolute inset-0 h-full w-full" />
          <span className="absolute inset-0 flex items-center justify-center text-[12px] font-medium tracking-[-0.24px] text-black">
            B
          </span>
        </div>
        <span className="text-[14px] font-medium tracking-[-0.28px] text-white">Ben</span>
      </div>
      <p className="absolute bottom-[374px] left-[39px] w-[334px] translate-y-full text-[40px] font-semibold leading-[1.2] tracking-[-0.8px] text-white">
        Friends find your note in the real world
      </p>
    </>
  )
}

const SLIDES = [
  { visual: Slide2Visual, dots: ob2ProgressDots },
  { visual: Slide3Visual, dots: ob3ProgressDots },
  { visual: Slide4Visual, dots: ob4ProgressDots },
]

// phase sequencing: each auto-advancing screen holds, then fades out
// before the next one fades in — rather than a hard cut. 'slides' itself
// only plays its entrance once, on arrival from subtitle-out; it doesn't
// replay on every Continue tap since the wrapping element never remounts
// as slideIndex changes.
// Onboarding - 1 -> 1.1 transition (splash-out): 300ms fade.
const EXIT_DURATION_MS = 300
// Onboarding - 1.1 -> 2 transition (subtitle-out): 1000ms fade — longer
// than the splash's exit, per spec. The shared `fade-out` animation is
// 300ms by default (unchanged, still used for splash-out); this
// transition overrides just its duration inline rather than changing the
// animation itself.
const SUBTITLE_EXIT_DURATION_MS = 1000
// So "BeReal." (which has no delay) visibly appears first, then the
// subtitle eases in after it.
const SUBTITLE_DELAY_MS = 150

export function OnboardingScreen({ onComplete }) {
  const [phase, setPhase] = useState('splash-in')
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const holdMs = phase === 'splash-in' ? SPLASH_DURATION_MS : SUBTITLE_DURATION_MS
    if (phase === 'splash-in' || phase === 'subtitle-in') {
      const timer = setTimeout(
        () => setPhase(phase === 'splash-in' ? 'splash-out' : 'subtitle-out'),
        holdMs
      )
      return () => clearTimeout(timer)
    }
    if (phase === 'splash-out' || phase === 'subtitle-out') {
      const exitMs = phase === 'splash-out' ? EXIT_DURATION_MS : SUBTITLE_EXIT_DURATION_MS
      const timer = setTimeout(
        () => setPhase(phase === 'splash-out' ? 'subtitle-in' : 'slides'),
        exitMs
      )
      return () => clearTimeout(timer)
    }
  }, [phase])

  function handleContinue() {
    if (slideIndex === SLIDES.length - 1) {
      onComplete()
      return
    }
    setSlideIndex((i) => i + 1)
  }

  // The big centered "BeReal." is only relevant for splash/1.1 — it's
  // still one persistent element across those two phases specifically
  // (so it can't flicker/remount going 1 -> 1.1), but the 1.1 -> 2 change
  // is a plain hard cut: this element unmounts, and SlideChrome mounts
  // its own separate, smaller, always-static title. No shared element,
  // no transition, nothing animates across that boundary.
  const isIntro = phase === 'splash-in' || phase === 'splash-out' || phase === 'subtitle-in' || phase === 'subtitle-out'

  let content = null

  if (phase === 'subtitle-in' || phase === 'subtitle-out') {
    const exiting = phase === 'subtitle-out'
    content = (
      <p
        key={`${phase}-subtitle`}
        style={
          exiting
            ? { animationDuration: `${SUBTITLE_EXIT_DURATION_MS}ms` }
            : { animationDelay: `${SUBTITLE_DELAY_MS}ms` }
        }
        className={
          'absolute left-0 right-0 top-[calc(50%+44px)] text-center text-[24px] font-normal leading-none tracking-[-0.48px] text-white ' +
          (exiting ? 'animate-fade-out' : 'opacity-0 animate-fade-in-up-subtitle')
        }
      >
        Introducing AR Notes
      </p>
    )
  } else if (phase === 'slides') {
    const { visual: Visual, dots } = SLIDES[slideIndex]
    content = (
      <div className="absolute inset-0">
        {/* Visual first, SlideChrome after — the full-width vignette
            inside Visual reaches solid black well before the bottom of
            the screen, which is exactly where SlideChrome's Continue
            button and progress dots sit. DOM-order-after means
            SlideChrome paints on top of that overlay instead of being
            visually buried under it (pointer-events-none on the overlay
            only fixes click-through, not painting order). */}
        <Visual />
        <SlideChrome
          showSkip
          onSkip={onComplete}
          onContinue={handleContinue}
          isLastSlide={slideIndex === SLIDES.length - 1}
          progressDots={dots}
        />
      </div>
    )
  }
  // phase === 'splash-in' / 'splash-out': no content of its own — the
  // persistent title below is the entire screen for those ~1100ms.

  return (
    <div className="relative h-full bg-black">
      {isIntro && (
        <h1 className="absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center text-[40px] font-semibold leading-none tracking-[-0.8px] text-white">
          BeReal.
        </h1>
      )}
      {content}
    </div>
  )
}
