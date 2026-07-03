import { useEffect } from 'react'
import { BackButton } from '../components/camera/BackButton'
import { Header } from '../components/shared/Header'

const LOADING_DURATION_MS = 1500

export function LoadingScreen({ onBack, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, LOADING_DURATION_MS)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="flex h-full flex-col bg-bereal-black pt-12">
      <div className="relative">
        <BackButton onClick={onBack} />
        <Header />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <p className="text-[16px] font-medium text-bereal-ink">
          Show your friends the real you
        </p>
      </div>
    </div>
  )
}
