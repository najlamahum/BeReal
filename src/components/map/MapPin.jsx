// Positioning (left/top) is owned by the KeepScale wrapper this renders
// inside of (see FriendsMap.jsx) — this component only owns the anchor
// offset (shifting the pin so its bottom tip, not its top-left corner,
// sits at the coordinate) and the pin's own visual content.
export function MapPin({ variant = 'plain', onClick }) {
  if (variant === 'note') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="block h-10 w-8 -translate-x-1/2 -translate-y-full"
      >
        {/* No width/height attributes on the <svg> itself — some browsers
            (Safari in particular) let those intrinsic attributes win over
            percentage CSS sizing, which was rendering this far larger than
            the button's actual 32x40 box. Only the viewBox sets the aspect
            ratio; the button's Tailwind classes control the real size. */}
        <svg
          viewBox="0 0 36 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-md"
        >
          <path
            d="M18 1C27.4136 1 35 8.84925 35 18.4668C34.9999 25.5851 31.5394 31.1919 27.8936 34.9414C26.2741 36.6112 24.4625 38.0721 22.4971 39.2891L22.4902 39.293C21.6643 39.7949 20.8729 40.2031 20.1641 40.4873L20.1631 40.4863C19.5252 40.7465 18.7437 41 18 41C17.2537 41 16.4692 40.7455 15.8301 40.4844L15.8213 40.4814C15.0208 40.1454 14.2461 39.7469 13.5049 39.29L13.5029 39.2891C11.5375 38.0721 9.72489 36.6122 8.10547 34.9424V34.9414C4.45976 31.1919 1.00012 25.5848 1 18.4668V18.4658L1.00586 18.0332C1.11603 13.5658 2.88766 9.29993 5.97266 6.125C9.15804 2.84689 13.4836 0.999999 18 1Z"
            fill="#CF3939"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M12.8102 13H10V29H12.5V24.1155H26L24.127 18.5578L26 13H12.8102Z"
            fill="white"
          />
        </svg>
      </button>
    )
  }

  return (
    <div className="h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-white" />
  )
}
