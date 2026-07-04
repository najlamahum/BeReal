// Live front-camera feed on mobile (isLive), static grey placeholder
// everywhere else (desktop, or mobile where the stream failed/was
// denied) — same box, same border, so the fallback is seamless.
export function FrontCameraPreview({ videoRef, isLive }) {
  return (
    <div className="absolute left-3 top-3 z-10 h-[160px] w-[120px] overflow-hidden rounded-2xl border border-black bg-bereal-surface">
      {/* Always mounted (not conditionally rendered on isLive) so the ref
          is attached and ready by the time getUserMedia's promise
          resolves — hidden via CSS instead, which also means the grey
          placeholder bg shows through cleanly until then, with no flash. */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={'relative z-0 h-full w-full object-cover ' + (isLive ? '' : 'hidden')}
      />
    </div>
  )
}
