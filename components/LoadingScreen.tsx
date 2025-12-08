"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import Image from "next/image"

const STATUS_MESSAGES = [
  "ESTABLISHING SECURE CONNECTION",
  "BYPASSING FIREWALL",
  "DECRYPTING DATABASE",
  "ACCESSING CLASSIFIED FILES",
  "LOADING EVIDENCE",
  "INITIALIZING INTERFACE",
  "VERIFYING CREDENTIALS",
  "CONNECTING TO DARKNET",
  "SCANNING FOR TRACES",
  "SYSTEM READY",
] as const

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [statusIndex, setStatusIndex] = useState(0)
  const [blink, setBlink] = useState(true)
  const [glitch, setGlitch] = useState(false)
  const animationRef = useRef<number | null>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    const runLoadingSequence = async () => {
      // Phase 1: 0% -> 23% (Fast)
      for (let i = 0; i <= 23 && isMountedRef.current; i++) {
        await new Promise((resolve) => setTimeout(resolve, 15))
        if (isMountedRef.current) setProgress(i)
      }

      // Phase 2: 23% -> 49% (Normal)
      for (let i = 24; i <= 49 && isMountedRef.current; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50))
        if (isMountedRef.current) setProgress(i)
      }

      // Phase 3: 49% -> 88% (Stuttering)
      for (let i = 50; i <= 88 && isMountedRef.current; i++) {
        const delay = Math.random() * 150 + 30
        const shouldGlitch = Math.random() > 0.7

        if (shouldGlitch && isMountedRef.current) {
          setGlitch(true)
          await new Promise((resolve) => setTimeout(resolve, 50))
          if (isMountedRef.current) setGlitch(false)
        }

        await new Promise((resolve) => setTimeout(resolve, delay))
        if (isMountedRef.current) setProgress(i)

        if (Math.random() > 0.85) {
          await new Promise((resolve) => setTimeout(resolve, 200))
        }
      }

      // Phase 4: 88% -> 99% (Very slow)
      for (let i = 89; i <= 99 && isMountedRef.current; i++) {
        const delay = 180 + Math.random() * 120
        await new Promise((resolve) => setTimeout(resolve, delay))
        if (isMountedRef.current) setProgress(i)
      }

      // Phase 5: 99% pause
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Phase 6: 100%
      if (isMountedRef.current) {
        setProgress(100)
        await new Promise((resolve) => setTimeout(resolve, 200))
        setIsLoading(false)
      }
    }

    runLoadingSequence()

    return () => {
      isMountedRef.current = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const messageIndex = Math.min(Math.floor(progress / 10), STATUS_MESSAGES.length - 1)
    setStatusIndex(messageIndex)
  }, [progress])

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev)
    }, 500)
    return () => clearInterval(blinkInterval)
  }, [])

  const logoStyle = useMemo(
    () => ({
      filter: "drop-shadow(0 0 20px rgba(138, 0, 0, 0.8))",
    }),
    [],
  )

  const containerStyle = useMemo(
    () => ({
      transform: glitch ? "translateX(2px)" : "translateX(0)",
      willChange: "transform" as const,
    }),
    [glitch],
  )

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background animate-fadeIn ${glitch ? "animate-pulse" : ""}`}
      style={{ willChange: "opacity" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.2) 2px, rgba(0, 0, 0, 0.2) 4px)",
          willChange: "transform",
        }}
      />
      <div className="text-center space-y-6 relative z-10">
        <div className="relative w-64 h-24 mx-auto flex items-center justify-center" style={containerStyle}>
          <Image
            src="/images/afterglow-logo.png"
            alt="Afterglow Logo"
            width={256}
            height={96}
            className="object-contain"
            style={logoStyle}
            priority
          />
        </div>
        <div className="font-mono text-primary glow-text tracking-wider">
          <span className="text-muted-foreground">{"> "}</span>
          <span className={`text-sm md:text-base ${glitch ? "opacity-70" : ""}`}>{STATUS_MESSAGES[statusIndex]}</span>
          <span className={`${blink ? "opacity-100" : "opacity-0"}`} style={{ transition: "opacity 0.1s" }}>
            _
          </span>
        </div>
        <div className="w-64 mx-auto">
          <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1">
            <span>[PROGRESS]</span>
            <span className={glitch ? "text-primary" : ""}>{progress}%</span>
          </div>
          <div className="h-1 bg-muted-foreground/20 overflow-hidden">
            <div
              className={`h-full bg-primary origin-left ${glitch ? "opacity-80" : ""}`}
              style={{
                transform: `scaleX(${progress / 100})`,
                transition: "transform 75ms ease-out",
                willChange: "transform",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
