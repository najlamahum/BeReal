import { BackButton } from '../components/camera/BackButton'
import { CameraFeed } from '../components/camera/CameraFeed'
import { CaptureButton } from '../components/camera/CaptureButton'
import { ModeToggle } from '../components/camera/ModeToggle'
import { Header } from '../components/shared/Header'
import { useCamera } from '../hooks/useCamera'

export function CameraScreen({ onBack, onCapture }) {
  // The only camera view on this screen — rear-facing on mobile, and on
  // desktop (which has no rear camera) getUserMedia's facingMode:
  // 'environment' is just an "ideal" hint, so the browser falls back to
  // whatever camera exists (the built-in front-facing webcam) with no
  // extra logic needed here.
  const { rearVideoRef, rearError } = useCamera()

  function handleCapture() {
    const video = rearVideoRef.current
    if (!video || !video.videoWidth) {
      onCapture(null)
      return
    }
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    onCapture(canvas.toDataURL('image/jpeg', 0.9))
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
      <CameraFeed rearVideoRef={rearVideoRef} rearError={rearError} />

      <ModeToggle />
      <div className="pb-2 pt-2">
        <CaptureButton onClick={handleCapture} />
      </div>
    </div>
  )
}
