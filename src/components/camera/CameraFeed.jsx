import { CameraControls } from './CameraControls'
import { FrontCameraPreview } from './FrontCameraPreview'

export function CameraFeed({ rearVideoRef, rearError }) {
  return (
    <div className="relative isolate mx-4 mt-3 h-[537px] overflow-hidden rounded-[32px] bg-bereal-surface">
      {/* relative + z-0: actively-playing <video> is promoted to its own
          compositor layer in Chrome and can paint above z-indexed siblings
          regardless of DOM/z-index order unless it's pinned into the
          normal stacking order explicitly. */}
      <video
        ref={rearVideoRef}
        autoPlay
        playsInline
        muted
        className="relative z-0 h-full w-full object-cover"
      />
      {rearError && (
        <div className="absolute inset-0 flex items-center justify-center px-8 text-center text-[13px] text-bereal-muted">
          Camera unavailable. Check permissions and try again.
        </div>
      )}
      <FrontCameraPreview />
      <CameraControls />
    </div>
  )
}
