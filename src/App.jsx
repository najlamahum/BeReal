import { useState } from 'react'
import { PhoneFrame } from './components/shared/PhoneFrame'
import { ARScreen } from './screens/ARScreen'
import { CameraScreen } from './screens/CameraScreen'
import { FriendsScreen } from './screens/FriendsScreen'
import { GettingCloserScreen } from './screens/GettingCloserScreen'
import { LoadingScreen } from './screens/LoadingScreen'
import { OnboardingScreen } from './screens/OnboardingScreen'
import { PostScreen } from './screens/PostScreen'

function App() {
  // Onboarding is the very first thing shown, and only once per session —
  // completing or skipping it both just move on to the Friends screen,
  // there's no persisted "seen onboarding" flag, so it reappears on a
  // fresh page load/session.
  const [screen, setScreen] = useState('onboarding')
  const [showRevealedPopup, setShowRevealedPopup] = useState(false)
  // Persists after the popup itself is dismissed — the note has been
  // read, so the "1 new note" badge shouldn't come back.
  const [noteUnlocked, setNoteUnlocked] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState(null)
  const [capturedFrontPhoto, setCapturedFrontPhoto] = useState(null)

  return (
    <PhoneFrame>
      {screen === 'onboarding' && (
        <OnboardingScreen onComplete={() => setScreen('friends')} />
      )}
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
          onCapture={(photo, frontPhoto) => {
            setCapturedPhoto(photo)
            setCapturedFrontPhoto(frontPhoto)
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
        <PostScreen
          photo={capturedPhoto}
          frontPhoto={capturedFrontPhoto}
          onBack={() => setScreen('camera')}
        />
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
    </PhoneFrame>
  )
}

export default App
