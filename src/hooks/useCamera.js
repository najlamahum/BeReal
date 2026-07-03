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

  useEffect(() => {
    if (!enabled) return
    let rearStream
    let cancelled = false

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
        if (rearVideoRef.current) rearVideoRef.current.srcObject = rearStream
      } catch (err) {
        if (!cancelled) setRearError(err)
      }
    }

    start()

    return () => {
      cancelled = true
      stopStream(rearStream)
    }
  }, [enabled])

  return { rearVideoRef, rearError }
}
