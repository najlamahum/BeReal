import { useEffect, useState } from 'react'
import { DesktopWarning } from './components/shared/DesktopWarning'
import { MobileViewport } from './components/shared/MobileViewport'
import { PhoneFrame } from './components/shared/PhoneFrame'
import { ARScreen } from './screens/ARScreen'
import { CameraScreen } from './screens/CameraScreen'
import { FriendsScreen } from './screens/FriendsScreen'
import { GettingCloserScreen } from './screens/GettingCloserScreen'
import { LoadingScreen } from './screens/LoadingScreen'
import { PostScreen } from './screens/PostScreen'

const DESKTOP_BREAKPOINT = 512

function App() {
  const [screen, setScreen] = useState('friends')
  const [showRevealedPopup, setShowRevealedPopup] = useState(false)
  // Persists after the popup itself is dismissed — the note has been
  // read, so the "1 new note" badge shouldn't come back.
  const [noteUnlocked, setNoteUnlocked] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState(null)

  const [isMobileWidth, setIsMobileWidth] = useState(
    () => window.innerWidth <= DESKTOP_BREAKPOINT,
  )
  const [desktopWarningDismissed, setDesktopWarningDismissed] = useState(false)

  useEffect(() => {
    function checkWidth() {
      setIsMobileWidth(window.innerWidth <= DESKTOP_BREAKPOINT)
    }
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  if (!isMobileWidth && !desktopWarningDismissed) {
    return <DesktopWarning onContinue={() => setDesktopWarningDismissed(true)} />
  }

  const content = (
    <>
      {screen === 'friends' && (
        <FriendsScreen
          onOpenCamera={() => setScreen('camera')}
          onOpenNote={() => setScreen('ar-getting-closer')}
          showRevealedPopup={showRevealedPopup}
          onDismissRevealedPopup={() => setShowRevealedPopup(false)}
          hideNoteBadge={noteUnlocked}
        />
      )}
      {screen === 'camera' && (
        <CameraScreen
          onBack={() => setScreen('friends')}
          onCapture={(photo) => {
            setCapturedPhoto(photo)
            setScreen('loading')
          }}
        />
      )}
      {screen === 'loading' && (
        <LoadingScreen
          onBack={() => setScreen('camera')}
          onComplete={() => setScreen('post')}
        />
      )}
      {screen === 'post' && (
        <PostScreen photo={capturedPhoto} onBack={() => setScreen('camera')} />
      )}
      {screen === 'ar-getting-closer' && (
        <GettingCloserScreen onComplete={() => setScreen('ar')} />
      )}
      {screen === 'ar' && (
        <ARScreen
          onBack={() => {
            setScreen('friends')
            setShowRevealedPopup(true)
            setNoteUnlocked(true)
          }}
        />
      )}
    </>
  )

  // Real mobile viewport: fill it edge-to-edge (100dvh, scaled canvas, no
  // decorative bezel). Desktop (after dismissing the warning): the bezel
  // mockup, as before.
  return isMobileWidth ? (
    <MobileViewport>{content}</MobileViewport>
  ) : (
    <PhoneFrame>{content}</PhoneFrame>
  )
}

export default App
