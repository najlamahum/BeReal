// Always a static placeholder — no live front-camera feed or
// getUserMedia call for it. Matches PostScreen's front-camera box
// exactly: dark grey (bereal-surface, #1c1c1e), 1px black border,
// rounded corners.
export function FrontCameraPreview() {
  return (
    <div className="absolute left-3 top-3 z-10 h-[160px] w-[120px] rounded-2xl border border-black bg-bereal-surface" />
  )
}
