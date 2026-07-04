import { ChevronDown, Lock, MapPin, Music, Pencil, User, X } from 'lucide-react'
import { useState } from 'react'
import { BackButton } from '../components/camera/BackButton'

// Darker frosted grey pill, matching the real BeReal app — visible
// against any background while staying semi-transparent.
const GLASS_PILL_STYLE = {
  background: 'rgba(60, 60, 60, 0.7)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: 'none',
}

export function PostScreen({ onBack, photo, frontPhoto }) {
  const [noteActive, setNoteActive] = useState(false)
  const [noteText, setNoteText] = useState('')

  function handleCancelNote() {
    setNoteActive(false)
    setNoteText('')
  }

  return (
    <div className="relative h-full bg-bereal-black">
      <BackButton onClick={onBack} size={44} className="absolute left-[17px] top-[80px] z-20" />
      <h1 className="absolute left-0 right-0 top-[80px] text-center text-[24px] font-medium tracking-[-0.48px] text-bereal-ink">
        BeReal.
      </h1>

      <p className="absolute left-[13px] top-[161px] text-[16px] font-medium tracking-[-0.32px] text-bereal-muted">
        Add Caption
      </p>

      <div
        className={
          'absolute left-0 top-[187px] h-[537px] w-full overflow-hidden rounded-[20px] ' +
          (noteActive ? 'bg-bereal-surface2' : 'bg-bereal-surface')
        }
      >
        {noteActive ? (
          <>
            <textarea
              autoFocus
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Start Typing..."
              className="h-full w-full resize-none bg-transparent px-5 pt-[43px] text-[20px] font-medium tracking-[-0.4px] text-bereal-ink placeholder:text-bereal-muted focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCancelNote}
              aria-label="Cancel note"
              className="absolute left-[335px] top-[19px] flex h-[41px] w-[50px] items-center justify-center rounded-full bg-bereal-surface"
            >
              <X size={18} className="text-bereal-ink" />
            </button>
          </>
        ) : (
          <>
            {/* The actual captured rear-camera still, filling the whole
                card — no nested/live video element, just a static frame
                grabbed via canvas on CameraScreen. */}
            {photo && (
              <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
            )}

            {/* Front camera: the still frame grabbed at shutter-press
                time on CameraScreen (mobile, when the live preview came
                up), or the same static grey placeholder as before if
                there's no front photo (desktop, or the stream failed). */}
            {frontPhoto ? (
              <img
                src={frontPhoto}
                alt=""
                className="absolute left-3 top-3 h-[160px] w-[120px] rounded-2xl border border-black object-cover"
              />
            ) : (
              <div className="absolute left-3 top-3 h-[160px] w-[120px] rounded-2xl border border-black bg-bereal-surface2" />
            )}

            <button
              type="button"
              onClick={() => setNoteActive(true)}
              className="absolute left-[258px] top-[19px] flex h-[41px] w-[127px] items-center justify-center gap-1.5 rounded-full"
              style={GLASS_PILL_STYLE}
            >
              <Pencil size={16} className="text-bereal-ink" />
              <span className="text-[14px] font-medium tracking-[-0.28px] text-bereal-ink">
                Add Note
              </span>
            </button>
          </>
        )}
      </div>

      {/* Bottom pill row — presentational only, per spec. Shifts from 4
          pills (default) to 3 (note active, location pill removed since
          location is always on when sending a note). */}
      <div className="absolute top-[670px] flex h-[41px] items-center gap-4 left-1/2 -translate-x-1/2">
        <div className="flex h-[41px] w-[50px] items-center justify-center rounded-full" style={GLASS_PILL_STYLE}>
          <User size={18} className="text-bereal-ink" />
        </div>
        <div
          className="flex h-[41px] w-[130px] items-center justify-center gap-1.5 rounded-full"
          style={GLASS_PILL_STYLE}
        >
          <Lock size={16} className="text-bereal-ink" />
          <span className="text-[14px] font-medium tracking-[-0.28px] text-bereal-ink">
            My Friends
          </span>
          <ChevronDown size={14} className="text-bereal-ink" />
        </div>
        {!noteActive && (
          <div
            className="flex h-[41px] w-[76px] items-center justify-center gap-1 rounded-full"
            style={GLASS_PILL_STYLE}
          >
            <MapPin size={14} className="text-bereal-ink" />
            <span className="text-[14px] font-medium tracking-[-0.28px] text-bereal-ink">
              On
            </span>
          </div>
        )}
        <div className="flex h-[41px] w-[49px] items-center justify-center rounded-full" style={GLASS_PILL_STYLE}>
          <Music size={18} className="text-bereal-ink" />
        </div>
      </div>

      <div className="absolute left-0 right-0 top-[760px] flex items-center justify-center gap-0">
        <span className="text-[40px] font-extrabold tracking-[-0.8px] text-bereal-ink">
          SEND
        </span>
        {/* Exact SVG provided for the send cursor icon — sized to match
            the 40px SEND text height, flush against it (no gap). */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_187_631)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M35.7932 20.0352C36.0208 20.1301 36.2151 20.2902 36.3518 20.4953C36.4884 20.7005 36.5613 20.9415 36.5612 21.188C36.5611 21.4345 36.4881 21.6754 36.3512 21.8805C36.2144 22.0855 36.0199 22.2455 35.7924 22.3402L14.6051 31.1682C14.3781 31.2628 14.1283 31.2883 13.8869 31.2414C13.6455 31.1946 13.4233 31.0775 13.2482 30.9048C13.0731 30.7322 12.9529 30.5117 12.9027 30.271C12.8524 30.0303 12.8744 29.7801 12.9658 29.5518L16.1262 21.6507C16.2451 21.3532 16.2451 21.0213 16.1262 20.7238L12.9658 12.8227C12.8744 12.5944 12.8524 12.3442 12.9027 12.1035C12.9529 11.8628 13.0731 11.6423 13.2482 11.4697C13.4233 11.297 13.6455 11.1799 13.8869 11.1331C14.1283 11.0862 14.3781 11.1117 14.6051 11.2063L35.7932 20.0352Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_187_631">
              <rect
                width="29.9633"
                height="29.9633"
                fill="white"
                transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 42.3745 21.1873)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  )
}
