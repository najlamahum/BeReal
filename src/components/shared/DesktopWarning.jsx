export function DesktopWarning({ onContinue }) {
  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] flex-col items-center bg-black px-8 text-center text-bereal-ink">
      <h1 className="pt-16 text-2xl font-bold">BeReal.</h1>

      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <p className="text-2xl font-semibold">This experience is best viewed on mobile.</p>
        <p className="text-[15px] text-bereal-muted">
          Open this page on your phone, or resize your browser window to continue.
        </p>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mb-16 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-black"
      >
        Continue anyway
      </button>
    </div>
  )
}
