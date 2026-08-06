import { useEffect, useRef, useState } from 'react'

function stopStream(stream) {
  stream?.getTracks().forEach((track) => track.stop())
}

// Requests only the rear (environment) camera stream. The front-camera
// preview on CameraScreen is a static placeholder by design (Safari on
// iOS doesn't reliably support two simultaneous camera streams), so
// there's no getUserMedia call for it here.
//
// enabled: lets callers (e.g. ARScreen, which only wants the live feed on
// mobile) mount this hook unconditionally — satisfying the rules of hooks
// — while skipping the actual getUserMedia call/permission prompt when
// not needed, rather than duplicating this hook's logic.
export function useCamera({ enabled = true } = {}) {
  const rearVideoRef = useRef(null)
  const [rearError, setRearError] = useState(null)
  // Distinct from just having a stream attached — callers that need to
  // know the feed is actually rendering frames (not just mid-permission
  // or mid-buffering) should wait on this instead.
  const [rearReady, setRearReady] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let rearStream
    let cancelled = false
    let videoEl

    function handleReady() {
      setRearReady(true)
    }

    async function start() {
      try {
        rearStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        })
        if (cancelled) {
          stopStream(rearStream)
          return
        }
        videoEl = rearVideoRef.current
        if (videoEl) {
          videoEl.srcObject = rearStream
          // Either is a fine signal that frames are actually rendering;
          // whichever the browser fires first wins, the other is a no-op.
          videoEl.addEventListener('playing', handleReady)
          videoEl.addEventListener('loadedmetadata', handleReady)
        }
      } catch (err) {
        if (!cancelled) setRearError(err)
      }
    }

    start()

    return () => {
      cancelled = true
      stopStream(rearStream)
      videoEl?.removeEventListener('playing', handleReady)
      videoEl?.removeEventListener('loadedmetadata', handleReady)
    }
  }, [enabled])

  return { rearVideoRef, rearError, rearReady }
}
