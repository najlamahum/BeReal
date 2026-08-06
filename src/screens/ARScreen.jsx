import { useEffect, useState } from 'react'
import mockArBackground from '../assets/mock-ar-background.png'
import { ARBackground } from '../components/ar/ARBackground'
import { ARNoteCard } from '../components/ar/ARNoteCard'
import { ARScanIcon } from '../components/ar/ARScanIcon'
import { MotionPermissionPrompt } from '../components/ar/MotionPermissionPrompt'
import { BackButton } from '../components/camera/BackButton'
import { CaptureButton } from '../components/camera/CaptureButton'
import { useCamera } from '../hooks/useCamera'
import { useDeviceOrientationParallax } from '../hooks/useDeviceOrientationParallax'

const UNLOCKING_DURATION_MS = 1500
const SUCCESS_TOAST_MS = 900
const MOBILE_MAX_WIDTH = 512
const NO_OFFSET = { x: 0, y: 0 }

// backdrop-filter still blurs the feed heavily, but the wash itself is
// light — this is meant to read as frosted glass (surroundings visible,
// just softened), not an opaque cover.
const UNLOCKING_OVERLAY_STYLE = {
  background: 'rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(40px)',
  WebkitBackdropFilter: 'blur(40px)',
}

export function ARScreen({ onBack }) {
  // Live rear-camera + device-tilt parallax on mobile; the static mock
  // image (unchanged) everywhere else, per spec.
  const [isMobile] = useState(() => window.innerWidth <= MOBILE_MAX_WIDTH)

  // Matches Figma's friends-12 → friends-4 transition: the AR view first
  // appears "unlocking" (translucent wash + compass + prompt), then clears
  // to the normal tap-to-unlock view — kept as one mounted component (not
  // a screen swap) so the camera feed/brackets/note card don't remount.
  //
  // On mobile there's a phase before that: 'waiting-camera' renders the
  // same black-screen look as GettingCloserScreen (screen 1) so Safari's
  // permission prompt appears over that neutral look rather than over the
  // "Move phone to start" unlocking screen — see the useCamera call below.
  // Desktop has nothing to wait on, so it skips straight to 'unlocking'.
  const [phase, setPhase] = useState(() => (isMobile ? 'waiting-camera' : 'unlocking'))
  // 'waiting-camera' | 'unlocking' | 'active'

  // The unlock trigger is the capture button, not the card itself — this
  // state lives here (not in ARNoteCard) so CaptureButton, a sibling, can
  // drive it.
  const [noteState, setNoteState] = useState('locked') // 'locked' | 'success' | 'revealed'

  // iOS gates DeviceOrientationEvent behind an explicit requestPermission()
  // call that must run inside a user-gesture handler — it can't be fired
  // from an effect on mount. Other browsers expose deviceorientation
  // without that gate at all, so the prompt only exists on iOS.
  const [motionPermission, setMotionPermission] = useState(() => {
    if (!isMobile) return 'not-needed'
    const needsExplicitPermission =
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    return needsExplicitPermission ? 'pending' : 'not-needed'
  })

  // Requested as soon as the AR flow begins on mobile — while 'waiting-
  // camera' is still showing its black look — so Safari's prompt lands on
  // that neutral screen instead of racing the "unlocking" coaching screen.
  const { rearVideoRef, rearReady, rearError } = useCamera({ enabled: isMobile })
  // A denied/failed camera falls back to the same static mock background
  // desktop uses, rather than showing a live feed that never arrives.
  const showLiveFeed = isMobile && !rearError
  const parallaxEnabled = isMobile && motionPermission !== 'pending' && motionPermission !== 'denied'
  const offset = useDeviceOrientationParallax(parallaxEnabled)

  async function handleAllowMotion() {
    try {
      const result = await DeviceOrientationEvent.requestPermission()
      setMotionPermission(result === 'granted' ? 'granted' : 'denied')
    } catch {
      // Denied, dismissed, or the call itself failed — proceed without
      // parallax rather than getting stuck on the prompt.
      setMotionPermission('denied')
    }
  }

  // Advance out of 'waiting-camera' once the feed is actually playing —
  // or immediately on a denied/failed permission, so a "no" doesn't leave
  // the user stuck on a black screen forever.
  useEffect(() => {
    if (phase !== 'waiting-camera') return
    if (rearReady || rearError) setPhase('unlocking')
  }, [phase, rearReady, rearError])

  // The "unlocking" duration only starts once we've actually entered that
  // phase — on mobile that's after the camera resolves, not on mount.
  useEffect(() => {
    if (phase !== 'unlocking') return
    const timer = setTimeout(() => setPhase('active'), UNLOCKING_DURATION_MS)
    return () => clearTimeout(timer)
  }, [phase])

  function handleCapturePress() {
    if (noteState !== 'locked') return
    setNoteState('success')
    setTimeout(() => setNoteState('revealed'), SUCCESS_TOAST_MS)
  }

  return (
    <div className="relative h-full bg-bereal-black">
      {/* Rendered as an overlay, not an early return before the rest of
          the tree — the <video> below must mount immediately so its ref
          is attached by the time useCamera's getUserMedia() promise
          resolves. An early return here would delay the video element's
          mount until after the prompt is dismissed, and useCamera only
          attaches the stream once, so a still-null ref at that point
          would silently strand the stream with nothing to play it. */}
      {phase === 'active' && motionPermission === 'pending' && (
        <MotionPermissionPrompt onAllow={handleAllowMotion} />
      )}

      {/* Same look as GettingCloserScreen (screen 1) — z-50 keeps it above
          everything else in this component regardless of DOM order, so
          Safari's camera prompt reads as still being over "screen 1"
          rather than over the unlocking/live view underneath. */}
      {phase === 'waiting-camera' && (
        <div className="absolute inset-0 z-50 flex flex-col bg-bereal-black">
          <h1 className="absolute left-0 right-0 top-[285px] text-center text-[24px] font-medium tracking-[-0.48px] text-bereal-ink">
            BeReal.
          </h1>
          <div className="flex flex-1 items-center justify-center">
            <div className="animate-pulse">
              <ARScanIcon size={80} />
            </div>
          </div>
        </div>
      )}

      <BackButton
        onClick={onBack}
        size={44}
        className="absolute left-[17px] top-[80px] z-20"
      />
      <h1
        className={
          'absolute left-0 right-0 text-center text-[24px] font-medium tracking-[-0.48px] text-bereal-ink ' +
          (phase === 'unlocking' ? 'top-[285px]' : 'top-[80px]')
        }
      >
        BeReal.
      </h1>

      <div className="absolute left-0 top-[145px] h-[537px] w-full overflow-hidden rounded-[20px]">
        {/* The <video> mounts whenever isMobile, independent of
            showLiveFeed/phase, so its ref is attached and ready the
            instant useCamera's getUserMedia() promise resolves — an
            error just hides it behind the mock background below rather
            than unmounting it. */}
        {isMobile && (
          <video
            ref={rearVideoRef}
            autoPlay
            playsInline
            muted
            className={
              'h-full w-full object-cover ' + (showLiveFeed ? 'relative z-0' : 'hidden')
            }
          />
        )}
        {!showLiveFeed && <ARBackground imageSrc={mockArBackground} />}
        {isMobile && rearError && (
          <div className="absolute inset-0 flex items-center justify-center px-8 text-center text-[13px] text-bereal-muted">
            Camera unavailable. Check permissions and try again.
          </div>
        )}
        <ARNoteCard state={noteState} offset={isMobile ? offset : NO_OFFSET} />

        {phase === 'unlocking' && (
          <div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 rounded-[20px]"
            style={UNLOCKING_OVERLAY_STYLE}
          >
            <div className="animate-pulse">
              <ARScanIcon size={80} />
            </div>
            <p className="text-[24px] font-normal tracking-[-0.48px] text-bereal-ink">
              Move phone to start
            </p>
          </div>
        )}
      </div>

      <p className="absolute left-0 right-0 top-[703px] text-center text-[14px] font-medium tracking-[-0.28px] text-bereal-ink">
        Press button to unlock
      </p>

      {/* CaptureButton's own wrapper adds 8px of top padding (py-2),
          so offset by -8px here to land its circle at Figma's y=737. */}
      <div className="absolute left-[163px] top-[729px]">
        <CaptureButton onClick={handleCapturePress} />
      </div>
    </div>
  )
}
