"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { LoadingScreen } from "@/components/LoadingScreen"
import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"

const AboutSection = lazy(() => import("@/components/AboutSection").then((mod) => ({ default: mod.AboutSection })))
const PosterSection = lazy(() => import("@/components/PosterSection").then((mod) => ({ default: mod.PosterSection })))
const TeamMembersSection = lazy(() =>
  import("@/components/TeamMembersSection").then((mod) => ({ default: mod.TeamMembersSection })),
)
const ContractSection = lazy(() =>
  import("@/components/ContractSection").then((mod) => ({ default: mod.ContractSection })),
)
const VideoSection = lazy(() => import("@/components/VideoSection").then((mod) => ({ default: mod.VideoSection })))
const ContactSection = lazy(() =>
  import("@/components/ContactSection").then((mod) => ({ default: mod.ContactSection })),
)

function SectionFallback() {
  return <div className="min-h-[50vh]" />
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <HeroSection />
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <PosterSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <VideoSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <TeamMembersSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ContractSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </main>
      </div>
    </>
  )
}
