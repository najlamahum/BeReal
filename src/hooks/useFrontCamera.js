import { useEffect, useRef, useState } from 'react'

const MOBILE_MAX_WIDTH = 512

function stopStream(stream) {
  stream?.getTracks().forEach((track) => track.stop())
}

// Live front-camera preview — mobile only (desktop keeps the static grey
// placeholder, per spec). Any failure (denied permission, no front
// camera, browser doesn't support two simultaneous streams, etc.) falls
// back to that same placeholder silently — isLive just stays false,
// there's no error state exposed to the UI for this secondary preview.
export function useFrontCamera({ enabled = true } = {}) {
  const frontVideoRef = useRef(null)
  const [isLive, setIsLive] = useState(false)
  const [isMobile] = useState(() => window.innerWidth <= MOBILE_MAX_WIDTH)

  useEffect(() => {
    if (!enabled || !isMobile) return
    let stream
    let cancelled = false

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'user' } },
          audio: false,
        })
        if (cancelled) {
          stopStream(stream)
          return
        }
        if (frontVideoRef.current) {
          frontVideoRef.current.srcObject = stream
          setIsLive(true)
        }
      } catch {
        // Silent fallback — no error surfaced for this preview.
      }
    }

    start()

    return () => {
      cancelled = true
      stopStream(stream)
      setIsLive(false)
    }
  }, [enabled, isMobile])

  return { frontVideoRef, isLive }
}
