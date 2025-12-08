"use client"

import { useState, useRef, useEffect } from "react"

export function AmbientSound() {
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element with ambient sound
    const audio = new Audio()
    // Using a data URL for a simple ambient drone sound simulation
    // In production, replace with actual ambient audio file
    audio.loop = true
    audio.volume = 0.15 // Very low volume by default
    audio.preload = "auto"

    // Using a placeholder - in production use actual audio file
    audio.src =
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQQDMILc2Kt9BwU5jNTbpHoGBTqM09ykewYFOozT3KR7BgU6jNPcpHsGBTqM09ykewYFOozT3KR7BgU6jNPcpHsGBTqM09ykewYF"

    audioRef.current = audio
    setIsLoaded(true)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleSound = () => {
    if (!audioRef.current) return

    if (isMuted) {
      audioRef.current.play().catch(() => {
        // Autoplay was prevented
      })
    } else {
      audioRef.current.pause()
    }
    setIsMuted(!isMuted)
  }

  if (!isLoaded) return null

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-4 right-4 z-50 limbus-button p-3 group"
      aria-label={isMuted ? "Bật âm thanh nền" : "Tắt âm thanh nền"}
      title={isMuted ? "Bật âm thanh nền" : "Tắt âm thanh nền"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isMuted ? (
          <svg
            className="w-5 h-5 text-primary group-hover:text-foreground transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-primary group-hover:text-foreground transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </div>
      <span className="absolute -top-8 right-0 text-xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isMuted ? "[SOUND_OFF]" : "[SOUND_ON]"}
      </span>
    </button>
  )
}
