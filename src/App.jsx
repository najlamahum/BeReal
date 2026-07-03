import { useState } from 'react'
import { PhoneFrame } from './components/shared/PhoneFrame'
import { ARScreen } from './screens/ARScreen'
import { CameraScreen } from './screens/CameraScreen'
import { FriendsScreen } from './screens/FriendsScreen'
import { GettingCloserScreen } from './screens/GettingCloserScreen'
import { LoadingScreen } from './screens/LoadingScreen'
import { PostScreen } from './screens/PostScreen'

function App() {
  const [screen, setScreen] = useState('friends')
  const [showRevealedPopup, setShowRevealedPopup] = useState(false)
  // Persists after the popup itself is dismissed — the note has been
  // read, so the "1 new note" badge shouldn't come back.
  const [noteUnlocked, setNoteUnlocked] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState(null)

  return (
    <PhoneFrame>
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
    </PhoneFrame>
  )
}

export default App
