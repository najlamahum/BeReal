const SCREEN_WIDTH = 402
const SCREEN_HEIGHT = 874
const BEZEL = 14

export function PhoneFrame({ children }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-950 p-8">
      <div
        className="relative rounded-[60px] bg-gradient-to-b from-neutral-700 to-neutral-900 shadow-2xl"
        style={{
          width: SCREEN_WIDTH + BEZEL * 2,
          height: SCREEN_HEIGHT + BEZEL * 2,
          padding: BEZEL,
        }}
      >
        {/* Side buttons — decorative, mimic the physical device edge */}
        <div className="absolute -left-[3px] top-[130px] h-8 w-[3px] rounded-l-sm bg-neutral-700" />
        <div className="absolute -left-[3px] top-[180px] h-14 w-[3px] rounded-l-sm bg-neutral-700" />
        <div className="absolute -left-[3px] top-[245px] h-14 w-[3px] rounded-l-sm bg-neutral-700" />
        <div className="absolute -right-[3px] top-[200px] h-20 w-[3px] rounded-r-sm bg-neutral-700" />

        <div
          className="relative overflow-hidden rounded-[46px] bg-bereal-black"
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
        >
          {children}

          {/* Dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-[11px] z-30 h-[32px] w-[114px] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  )
}
