import { Calendar, Camera, CircleUserRound, Home, Users } from 'lucide-react'

const TABS = [
  { key: 'home', label: 'Home', Icon: Home },
  { key: 'friends', label: 'Friends', Icon: Users },
  { key: 'camera', label: null, Icon: Camera },
  { key: 'memories', label: 'Memories', Icon: Calendar },
  { key: 'profile', label: 'Profile', Icon: CircleUserRound },
]

// True iOS frosted-glass chrome: saturate() alongside blur() is what
// sells the effect — blur alone just looks like a translucent fill.
const GLASS_STYLE = {
  background: 'rgba(20, 20, 20, 0.55)',
  backdropFilter: 'saturate(180%) blur(30px)',
  WebkitBackdropFilter: 'saturate(180%) blur(30px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 -1px 0 rgba(255,255,255,0.06)',
  borderRadius: '30px',
}

export function TabBar({ active, onCameraPress }) {
  return (
    <div className="absolute inset-x-0 bottom-[10px] mx-4">
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={GLASS_STYLE}
      >
        {TABS.map(({ key, label, Icon }) => {
          if (key === 'camera') {
            return (
              <button
                key={key}
                type="button"
                onClick={onCameraPress}
                aria-label="Open camera"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-bereal-ink"
              >
                <Camera size={18} className="text-bereal-black" />
              </button>
            )
          }

          const isActive = key === active

          return (
            <button
              key={key}
              type="button"
              className={
                'flex flex-col items-center gap-0.5 rounded-xl px-2.5 py-1' +
                (isActive ? ' bg-white/10' : '')
              }
            >
              <Icon
                size={18}
                className={isActive ? 'text-bereal-ink' : 'text-bereal-muted'}
              />
              <span
                className={
                  'text-[10px] ' +
                  (isActive ? 'text-bereal-ink' : 'text-bereal-muted')
                }
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
