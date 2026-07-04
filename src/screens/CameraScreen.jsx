import { BackButton } from '../components/camera/BackButton'
import { CameraFeed } from '../components/camera/CameraFeed'
import { CaptureButton } from '../components/camera/CaptureButton'
import { ModeToggle } from '../components/camera/ModeToggle'
import { Header } from '../components/shared/Header'
import { useCamera } from '../hooks/useCamera'
import { useFrontCamera } from '../hooks/useFrontCamera'

function grabFrame(video) {
  if (!video || !video.videoWidth) return null
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.9)
}

export function CameraScreen({ onBack, onCapture }) {
  const { rearVideoRef, rearError } = useCamera()
  const { frontVideoRef, isLive: frontIsLive } = useFrontCamera()

  function handleCapture() {
    const rearPhoto = grabFrame(rearVideoRef.current)
    // Only grab a front still if the live preview actually came up —
    // otherwise PostScreen falls back to its own grey placeholder.
    const frontPhoto = frontIsLive ? grabFrame(frontVideoRef.current) : null
    onCapture(rearPhoto, frontPhoto)
  }

  return (
    <div className="flex h-full flex-col bg-bereal-black pt-12">
      {/* Back button lives in the header row, beside the title — not
          overlaid on the feed below it. */}
      <div className="relative">
        <BackButton onClick={onBack} />
        <Header />
      </div>

      {/* Fixed 537px height — matches PostScreen's photo placeholder card
          exactly, so the feed and the post-capture preview read as the
          same aspect ratio instead of the feed looming taller. */}
      <CameraFeed
        rearVideoRef={rearVideoRef}
        rearError={rearError}
        frontVideoRef={frontVideoRef}
        frontIsLive={frontIsLive}
      />

      <ModeToggle />
      <div className="pb-2 pt-2">
        <CaptureButton onClick={handleCapture} />
      </div>
    </div>
  )
}
