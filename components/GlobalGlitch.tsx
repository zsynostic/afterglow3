"use client"

import { useEffect, useState } from "react"

export function GlobalGlitch() {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)

      // Schedule next glitch in 7-10 seconds
      const nextDelay = 7000 + Math.random() * 3000
      setTimeout(triggerGlitch, nextDelay)
    }

    // Initial delay before first glitch
    const initialDelay = 3000 + Math.random() * 4000
    const timeout = setTimeout(triggerGlitch, initialDelay)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={`global-glitch-overlay ${isGlitching ? "glitching" : ""}`}>
      <div className="chromatic-red" />
      <div className="chromatic-cyan" />
    </div>
  )
}
