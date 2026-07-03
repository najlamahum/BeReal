// iOS requires DeviceOrientationEvent.requestPermission() to be called
// from directly inside a user gesture handler — it can't be requested
// automatically on mount. This blocks the AR screen with a single tap
// target until that gesture happens.
export function MotionPermissionPrompt({ onAllow }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-bereal-black px-10 text-center">
      <p className="text-[18px] font-medium tracking-[-0.36px] text-bereal-ink">
        Allow motion access for AR
      </p>
      <button
        type="button"
        onClick={onAllow}
        className="rounded-full bg-bereal-ink px-6 py-3 text-[15px] font-semibold text-bereal-black"
      >
        Continue
      </button>
    </div>
  )
}
