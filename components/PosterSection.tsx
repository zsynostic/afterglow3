"use client"

import type React from "react"
import Image from "next/image"
import { useState, useRef, useCallback, useMemo } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export function PosterSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const posterRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!posterRef.current) return
    const rect = posterRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setTilt({ x: y * 10, y: -x * 10 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const posterTransformStyle = useMemo(
    () => ({
      transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      willChange: isHovered ? ("transform" as const) : ("auto" as const),
    }),
    [tilt.x, tilt.y, isHovered],
  )

  const redOverlayStyle = useMemo(
    () => ({
      background: "linear-gradient(180deg, rgba(138,0,0,0.4) 0%, rgba(80,0,0,0.6) 50%, rgba(30,0,0,0.8) 100%)",
      mixBlendMode: "multiply" as const,
    }),
    [],
  )

  const colorOverlayStyle = useMemo(
    () => ({
      background: "rgba(120,0,0,1)",
      mixBlendMode: "color" as const,
    }),
    [],
  )

  const vignetteStyle = useMemo(
    () => ({
      background: "radial-gradient(ellipse at center, transparent 40%, rgba(80,0,0,0.7) 100%)",
    }),
    [],
  )

  return (
    <section id="poster" ref={ref} className="py-20 bg-background" data-testid="section-poster">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="limbus-container inline-block px-8 py-4 mb-6">
            <h2
              className={`text-4xl sm:text-5xl font-bold font-mono text-primary glow-text ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              data-testid="text-poster-title"
            >
              [POSTER_DỰ_ÁN]
            </h2>
          </div>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto font-mono ${
              isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"
            }`}
          >
            // KHÁM_PHÁ_PHÁT_HIỆN_VỀ_SỰ_THIẾU_HIỂU_BIẾT
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div
            className={`perspective-1000 w-full max-w-4xl ${isVisible ? "animate-fadeInUp stagger-2" : "opacity-0"}`}
          >
            <div
              ref={posterRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              className="relative preserve-3d"
              style={{
                ...posterTransformStyle,
                transition: "transform 0.3s ease-out",
              }}
              data-testid="poster-3d-container"
            >
              <div
                className={`relative overflow-hidden limbus-card ${
                  isHovered
                    ? "border-2 border-[#8a0000] shadow-[0_0_20px_rgba(138,0,0,0.5)]"
                    : "border border-[#8a0000]/50"
                }`}
                style={{ transition: "border-color 0.3s, box-shadow 0.3s" }}
              >
                <Image
                  src="/images/poster.png"
                  alt="IGNORANCE - Research Poster"
                  width={600}
                  height={800}
                  className={`w-full h-auto ${
                    isHovered
                      ? "grayscale-0 sepia saturate-[3] hue-rotate-[-50deg] contrast-[1.1] brightness-[0.9]"
                      : "grayscale contrast-[1.2]"
                  }`}
                  style={{ transition: "filter 0.3s" }}
                  sizes="(max-width: 768px) 100vw, 896px"
                />

                <div
                  className={`absolute inset-0 pointer-events-none ${isHovered ? "opacity-60" : "opacity-0"}`}
                  style={{ ...redOverlayStyle, transition: "opacity 0.3s" }}
                />

                <div
                  className={`absolute inset-0 pointer-events-none ${isHovered ? "opacity-50" : "opacity-0"}`}
                  style={{ ...colorOverlayStyle, transition: "opacity 0.3s" }}
                />

                <div
                  className={`absolute inset-0 pointer-events-none ${isHovered ? "opacity-0" : "opacity-100"}`}
                  style={{ transition: "opacity 0.3s" }}
                >
                  <div
                    className="absolute w-full h-4 bg-black/90 glitch-bar-1"
                    style={{ top: "15%", willChange: "transform" }}
                  />
                  <div
                    className="absolute w-full h-6 bg-gray-900/80 glitch-bar-2"
                    style={{ top: "35%", willChange: "transform" }}
                  />
                  <div
                    className="absolute w-full h-3 bg-black/70 glitch-bar-3"
                    style={{ top: "55%", willChange: "transform" }}
                  />
                  <div
                    className="absolute w-full h-5 bg-gray-800/90 glitch-bar-1"
                    style={{ top: "75%", willChange: "transform" }}
                  />
                  <div
                    className="absolute w-full h-2 bg-black/80 glitch-bar-2"
                    style={{ top: "90%", willChange: "transform" }}
                  />
                </div>

                <div
                  className={`absolute inset-0 backdrop-blur-sm pointer-events-none ${isHovered ? "opacity-0" : "opacity-70"}`}
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(20,20,20,0.6) 50%, rgba(0,0,0,0.7) 100%)",
                    transition: "opacity 0.3s, backdrop-filter 0.3s",
                  }}
                />

                <div
                  className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isHovered ? "opacity-0" : "opacity-100"}`}
                  style={{ transition: "opacity 0.3s" }}
                >
                  <div
                    className="font-mono text-2xl sm:text-4xl font-bold tracking-widest text-flicker"
                    style={{
                      color: "#8a0000",
                      textShadow: "0 0 10px rgba(138,0,0,0.8), 0 0 20px rgba(138,0,0,0.5)",
                    }}
                  >
                    [CLASSIFIED]
                  </div>
                </div>

                <div
                  className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"}`}
                  style={{ transition: "opacity 0.3s" }}
                >
                  <div
                    className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-flicker"
                    style={{
                      color: "#ff0000",
                      textShadow: "0 0 15px rgba(255,0,0,0.9), 0 0 30px rgba(255,0,0,0.6), 0 0 45px rgba(200,0,0,0.4)",
                    }}
                  >
                    [RED_ALERT::DECRYPTING]
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 font-mono text-xs text-muted-foreground">
                  [IGNORANCE_POSTER]
                </div>

                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none scanlines-hover"
                    style={{ willChange: "background-position" }}
                  />
                )}

                <div
                  className={`absolute inset-0 pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"}`}
                  style={{ ...vignetteStyle, transition: "opacity 0.3s" }}
                />
              </div>
            </div>
          </div>

          <div className={`mt-8 ${isVisible ? "animate-fadeInUp stagger-3" : "opacity-0"}`}>
            <button className="limbus-button" data-testid="button-download-poster">
              [TẢI_POSTER]
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glitch-bar-1 {
          animation: glitchBar1 0.2s steps(2) infinite;
        }
        .glitch-bar-2 {
          animation: glitchBar2 0.3s steps(3) infinite;
        }
        .glitch-bar-3 {
          animation: glitchBar3 0.25s steps(2) infinite;
        }
        
        @keyframes glitchBar1 {
          0% { transform: translateX(0); opacity: 0.9; }
          50% { transform: translateX(-10px); opacity: 0.7; }
          100% { transform: translateX(5px); opacity: 0.9; }
        }
        
        @keyframes glitchBar2 {
          0% { transform: translateX(0); opacity: 0.8; }
          50% { transform: translateX(8px); opacity: 0.6; }
          100% { transform: translateX(-3px); opacity: 0.8; }
        }
        
        @keyframes glitchBar3 {
          0% { transform: translateX(0); opacity: 0.7; }
          50% { transform: translateX(-6px); opacity: 0.9; }
          100% { transform: translateX(4px); opacity: 0.7; }
        }
        
        .text-flicker {
          animation: textFlicker 0.5s steps(2) infinite;
        }
        
        @keyframes textFlicker {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        
        .scanlines-hover {
          background: repeating-linear-gradient(0deg, rgba(255,0,0,0.08) 0px, rgba(255,0,0,0.08) 1px, transparent 1px, transparent 2px);
          animation: scanlines 0.1s linear infinite;
        }
        
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
      `}</style>
    </section>
  )
}
