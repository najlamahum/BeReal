export function CaptureButton({ onClick }) {
  return (
    <div className="flex justify-center py-2">
      <button
        type="button"
        onClick={onClick}
        aria-label="Capture"
        className="flex h-[79px] w-[79px] items-center justify-center rounded-full bg-bereal-ink"
      >
        <span className="h-[67px] w-[67px] rounded-full ring-2 ring-inset ring-bereal-black" />
      </button>
    </div>
  )
}
