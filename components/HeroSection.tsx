"use client"

import { useCallback, useMemo } from "react"
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation"
import { ParticleBackground } from "./ParticleBackground"

export function HeroSection() {
  const { ref, isVisible } = useScrollAnimation()
  const offsetY = useParallax()

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const particleContainerStyle = useMemo(
    () => ({
      transform: `translate3d(0, ${offsetY * 0.5}px, 0)`,
      zIndex: 0,
      willChange: "transform" as const,
    }),
    [offsetY],
  )

  const gradientOverlayStyle = useMemo(
    () => ({
      transform: `translate3d(0, ${offsetY * 0.3}px, 0)`,
      zIndex: 1,
      willChange: "transform" as const,
    }),
    [offsetY],
  )

  const contentStyle = useMemo(
    () => ({
      transform: `translate3d(0, ${offsetY * 0.1}px, 0)`,
      willChange: "transform" as const,
    }),
    [offsetY],
  )

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      data-testid="section-hero"
    >
      <div className="absolute inset-0" style={particleContainerStyle}>
        <ParticleBackground />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"
        style={gradientOverlayStyle}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" style={contentStyle}>
        <div className="max-w-4xl">
          <div className={`mb-4 ${isVisible ? "animate-fadeInUp" : "opacity-0"}`}>
            <span className="text-6xl sm:text-8xl font-bold text-primary glitch-text font-mono" data-text="Afterglow">
              Afterglow
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight font-mono ${
              isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"
            }`}
            data-testid="text-hero-title"
          >
            <span className="text-primary glow-text">Ignorance</span>
            <span className="text-foreground"> – Can it be </span>
            <br />
            <span className="text-primary glow-text">Changed?</span>
            <span className="text-foreground"> How?</span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed font-mono ${
              isVisible ? "animate-fadeInUp stagger-2" : "opacity-0"
            }`}
            data-testid="text-hero-description"
          >
            Khám phá về sự <span className="text-primary glow-text-subtle font-semibold">thiếu hiểu biết</span> trong xã
            hội hiện đại và tìm kiếm những phương pháp{" "}
            <span className="text-primary glow-text-subtle font-semibold">hiệu quả</span> để thay đổi tình trạng này
            thông qua{" "}
            <span className="text-primary glow-text-subtle font-semibold">giáo dục và nâng cao nhận thức</span>.
          </p>

          <div className={`flex flex-wrap gap-4 ${isVisible ? "animate-fadeInUp stagger-3" : "opacity-0"}`}>
            <button
              onClick={() => scrollToSection("about")}
              className="limbus-button"
              data-testid="button-explore-project"
            >
              [KHÁM_PHÁ_DỰ_ÁN]
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 animate-float" style={{ transform: "translateX(-50%)" }}>
        <span
          className="text-2xl text-primary glow-text animate-pulse-slow font-mono hover:scale-110"
          style={{ transition: "transform 0.3s" }}
        >
          ↓
        </span>
      </div>
    </section>
  )
}
