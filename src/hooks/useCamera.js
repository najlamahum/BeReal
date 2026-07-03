import { useEffect, useRef, useState } from 'react'

function stopStream(stream) {
  stream?.getTracks().forEach((track) => track.stop())
}

// Requests only the rear (environment) camera stream. The front-camera
// preview on CameraScreen is a static placeholder by design (Safari on
// iOS doesn't reliably support two simultaneous camera streams), so
// there's no getUserMedia call for it here.
export function useCamera() {
  const rearVideoRef = useRef(null)
  const [rearError, setRearError] = useState(null)

  useEffect(() => {
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
  }, [])

  return { rearVideoRef, rearError }
}
