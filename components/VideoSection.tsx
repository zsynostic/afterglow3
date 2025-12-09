"use client"

import type React from "react"

import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useState, useEffect, useRef } from "react"

type Stage = "no_signal" | "transition" | "video_playback"

export function VideoSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [stage, setStage] = useState<Stage>("no_signal")
  const [glitchIntensity, setGlitchIntensity] = useState(1)
  const [statusText, setStatusText] = useState("SEARCHING...")
  const [videoOpacity, setVideoOpacity] = useState(0)
  const [transitionFlicker, setTransitionFlicker] = useState(false)
  const [textFragments, setTextFragments] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (isVisible && stage === "no_signal") {
      const timer = setTimeout(() => {
        setStage("transition")
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, stage])

  useEffect(() => {
    if (stage === "transition") {
      setTransitionFlicker(true)
      setStatusText("SIGNAL_ACQUIRED")

      setTimeout(() => {
        setTextFragments(true)
      }, 500)

      let opacity = 0
      const stutterInterval = setInterval(() => {
        const stutter = Math.random() > 0.3
        if (stutter) {
          opacity = Math.min(opacity + 0.15, 1)
          setVideoOpacity(opacity)
        } else {
          setVideoOpacity(Math.max(opacity - 0.1, 0))
        }
        setGlitchIntensity(Math.random() * 0.5 + 0.5)
      }, 100)

      const transitionTimer = setTimeout(() => {
        clearInterval(stutterInterval)
        setStage("video_playback")
      }, 2000)

      return () => {
        clearInterval(stutterInterval)
        clearTimeout(transitionTimer)
      }
    }
  }, [stage])

  useEffect(() => {
    if (stage === "video_playback") {
      setTransitionFlicker(false)
      setGlitchIntensity(0)

      let opacity = videoOpacity
      const fadeInterval = setInterval(() => {
        opacity += 0.05
        setVideoOpacity(Math.min(opacity, 1))
        if (opacity >= 1) {
          clearInterval(fadeInterval)
        }
      }, 50)

      return () => clearInterval(fadeInterval)
    }
  }, [stage])

  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (stage === "no_signal" || stage === "transition") {
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          setGlitchOffset({
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 5,
          })
        } else {
          setGlitchOffset({ x: 0, y: 0 })
        }
      }, 50)
      return () => clearInterval(glitchInterval)
    } else {
      setGlitchOffset({ x: 0, y: 0 })
    }
  }, [stage])

  if (stage === "video_playback") {
    return (
      <section id="video" ref={ref} className="py-20 bg-background" data-testid="section-video">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="limbus-container inline-block px-8 py-4 mb-6">
              <h2
                className={`text-4xl sm:text-5xl font-bold font-mono text-primary glow-text ${
                  isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
                data-testid="text-video-title"
              >
                [VIDEO_GIỚI_THIỆU]
              </h2>
            </div>
            <p
              className={`text-xl text-muted-foreground font-mono ${isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"}`}
            >
              // TUYỆT_VỌNG_ĐIỆN_ẢNH
            </p>
          </div>

          <div className={`${isVisible ? "animate-fadeInUp stagger-2" : "opacity-0"}`}>
            {/* Clean video container - NO effects, NO overlays */}
            <div className="relative w-full aspect-video overflow-hidden bg-black border-2 border-red-800 shadow-[0_0_20px_rgba(139,0,0,0.5)_inset_0_0_30px_rgba(0,0,0,0.8)]">
              <iframe
                ref={videoRef}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: videoOpacity }}
                src="https://youtu.be/mNGi_9KacSY"
                title="Afterglow Project Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Render for no_signal and transition stages - with effects
  return (
    <section id="video" ref={ref} className="py-20 bg-background" data-testid="section-video">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="limbus-container inline-block px-8 py-4 mb-6">
            <h2
              className={`text-4xl sm:text-5xl font-bold font-mono text-primary glow-text ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              data-testid="text-video-title"
            >
              [VIDEO_GIỚI_THIỆU]
            </h2>
          </div>
          <p
            className={`text-xl text-muted-foreground font-mono ${isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"}`}
          >
            // TUYỆT_VỌNG_ĐIỆN_ẢNH
          </p>
        </div>

        <div className={`${isVisible ? "animate-fadeInUp stagger-2" : "opacity-0"}`}>
          <div
            className={`relative w-full aspect-video overflow-hidden bg-black select border-2 border-red-800 shadow-[0_0_20px_rgba(139,0,0,0.5)_inset_0_0_30px_rgba(0,0,0,0.8)] ${
              transitionFlicker ? "video-transition-flicker" : ""
            }`}
          >
            {/* Static noise background */}
            {(stage === "no_signal" || stage === "transition") && (
              <div
                className="absolute inset-0 z-10 video-static-heavy"
                style={{ opacity: stage === "no_signal" ? 0.6 : glitchIntensity * 0.4 }}
              />
            )}

            {/* Scanlines - ONLY during no_signal */}
            {stage === "no_signal" && <div className="absolute inset-0 z-20 video-scanlines-heavy" />}

            {/* Chromatic aberration */}
            {(stage === "no_signal" || stage === "transition") && (
              <>
                <div className="absolute inset-0 z-15 chromatic-red-layer" style={{ opacity: glitchIntensity * 0.3 }} />
                <div
                  className="absolute inset-0 z-15 chromatic-cyan-layer"
                  style={{ opacity: glitchIntensity * 0.2 }}
                />
              </>
            )}

            {/* NO SIGNAL text */}
            {(stage === "no_signal" || (stage === "transition" && !textFragments)) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                <div
                  className="relative"
                  style={{
                    transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
                  }}
                >
                  <h3
                    className="text-5xl sm:text-7xl font-bold tracking-widest font-mono no-signal-glitch"
                    data-text="NO SIGNAL"
                    style={{
                      textShadow: `
                        ${glitchOffset.x * 0.5}px 0 rgba(255,0,0,0.8),
                        ${-glitchOffset.x * 0.5}px 0 rgba(0,255,255,0.8)
                      `,
                    }}
                  >
                    NO SIGNAL
                  </h3>

                  <h3
                    className="absolute top-0 left-0 text-5xl sm:text-7xl font-bold tracking-widest font-mono text-red-600 opacity-70"
                    style={{
                      transform: `translate(${glitchOffset.x * 2}px, ${glitchOffset.y}px)`,
                      clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                    }}
                  >
                    NO SIGNAL
                  </h3>
                  <h3
                    className="absolute top-0 left-0 text-5xl sm:text-7xl font-bold tracking-widest font-mono text-cyan-400 opacity-50"
                    style={{
                      transform: `translate(${-glitchOffset.x * 2}px, ${-glitchOffset.y}px)`,
                      clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                    }}
                  >
                    NO SIGNAL
                  </h3>
                </div>

                <div className="mt-8 text-lg tracking-wider font-mono">
                  <span className="text-gray-600">STATUS: </span>
                  <span className={`${stage === "transition" ? "text-green-400" : "text-gray-500"} animate-pulse`}>
                    {statusText}
                  </span>
                </div>
              </div>
            )}

            {/* Fragmented text during transition */}
            {stage === "transition" && textFragments && (
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <div className="relative">
                  {["N", "O", " ", "S", "I", "G", "N", "A", "L"].map((char, i) => (
                    <span
                      key={i}
                      className="inline-block text-5xl sm:text-7xl font-bold tracking-widest font-mono text-gray-500 fragment-piece"
                      style={
                        {
                          animation: `fragment-fly ${0.5 + Math.random() * 0.5}s ease-out forwards`,
                          animationDelay: `${i * 0.05}s`,
                          "--fly-x": `${(Math.random() - 0.5) * 200}px`,
                          "--fly-y": `${(Math.random() - 0.5) * 200}px`,
                          "--fly-rotate": `${(Math.random() - 0.5) * 180}deg`,
                        } as React.CSSProperties
                      }
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-20 text-lg tracking-wider font-mono">
                  <span className="text-gray-600">STATUS: </span>
                  <span className="text-green-400 font-bold">SIGNAL_ACQUIRED</span>
                </div>
              </div>
            )}

            {/* YouTube Video - only visible during transition */}
            {stage === "transition" && (
              <iframe
                ref={videoRef}
                className="absolute inset-0 w-full h-full z-5"
                style={{
                  opacity: videoOpacity,
                  filter: `blur(${(1 - videoOpacity) * 5}px)`,
                }}
                src="https://youtu.be/mNGi_9KacSY"
                title="Afterglow Project Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-red-700 z-40 pointer-events-none" />
            <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-red-700 z-40 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-red-700 z-40 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-red-700 z-40 pointer-events-none" />

            <div className="absolute top-0 left-0 w-4 h-4 bg-red-800 z-40 pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 bg-red-800 z-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-red-800 z-40 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-800 z-40 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
