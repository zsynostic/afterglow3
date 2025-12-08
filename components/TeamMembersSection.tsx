"use client"

import type React from "react"
import Image from "next/image"
import { useState, useRef, useCallback, useMemo } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

interface TeamMember {
  name: string
  role: string
  image: string
  id: string
  email?: string
  social?: { type: string; url: string }[]
}

interface Tilt3D {
  x: number
  y: number
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Trần Ngọc Dũng",
    role: "Trưởng nhóm",
    id: "25127309",
    image: "/images/25127309-anh.jpg",
    social: [
      { type: "facebook", url: "#" },
      { type: "mail", url: "#" },
    ],
  },
  {
    name: "Ngô Đại Thiên Phúc",
    role: "Chỉnh sửa video",
    id: "25127461",
    image: "/images/25127461-anh.jpg",
    social: [
      { type: "facebook", url: "#" },
      { type: "mail", url: "#" },
    ],
  },
  {
    name: "Trần Nguyễn Hoàng Huy",
    role: "Website",
    id: "25127354",
    image: "/images/25127354-anh.jpeg",
    social: [
      { type: "facebook", url: "#" },
      { type: "mail", url: "#" },
    ],
  },
  {
    name: "Từ Nguyễn Thuận Thiên",
    role: "Kịch bản",
    id: "25127146",
    image: "/images/25127146-anh.jpg",
    social: [
      { type: "facebook", url: "#" },
      { type: "mail", url: "#" },
    ],
  },
  {
    name: "Võ Đăng Khôi",
    role: "Kịch bản",
    id: "25127395",
    image: "/images/25127395-anh.jpeg",
    social: [
      { type: "facebook", url: "#" },
      { type: "mail", url: "#" },
    ],
  },
]

export function TeamMembersSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [cardTilts, setCardTilts] = useState<{ [key: number]: Tilt3D }>({})
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height

    setCardTilts((prev) => ({
      ...prev,
      [index]: { x: y * 15, y: -x * 15 },
    }))
  }, [])

  const handleCardMouseLeave = useCallback((index: number) => {
    setCardTilts((prev) => ({
      ...prev,
      [index]: { x: 0, y: 0 },
    }))
  }, [])

  const handleCardMouseEnter = useCallback((index: number) => {
    setHoveredCard(index)
  }, [])

  const handleCardMouseLeaveWithHover = useCallback(
    (index: number) => {
      setHoveredCard(null)
      handleCardMouseLeave(index)
    },
    [handleCardMouseLeave],
  )

  return (
    <section id="members" ref={ref} className="py-20 bg-background" data-testid="section-members">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="limbus-container inline-block px-8 py-4 mb-6">
            <h2
              className={`text-4xl sm:text-5xl font-bold font-mono text-primary glow-text ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              data-testid="text-members-title"
            >
              [THÀNH_VIÊN_NHÓM]
            </h2>
          </div>
          <p
            className={`text-xl text-muted-foreground font-mono ${isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"}`}
          >
            {"// HỒ_SƠ_ĐỘI_ĐIỀU_TRA_DỰ_ÁN"}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <MemberCard
              key={index}
              member={member}
              index={index}
              isVisible={isVisible}
              isHovered={hoveredCard === index}
              tilt={cardTilts[index] || { x: 0, y: 0 }}
              cardRef={(el) => {
                cardRefs.current[index] = el
              }}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseEnter={() => handleCardMouseEnter(index)}
              onMouseLeave={() => handleCardMouseLeaveWithHover(index)}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes glitch-slide {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes scan-line {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100%); opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}

interface MemberCardProps {
  member: TeamMember
  index: number
  isVisible: boolean
  isHovered: boolean
  tilt: Tilt3D
  cardRef: (el: HTMLDivElement | null) => void
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function MemberCard({
  member,
  index,
  isVisible,
  isHovered,
  tilt,
  cardRef,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
}: MemberCardProps) {
  const cardStyle = useMemo(
    () => ({
      transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.03 : 1})`,
      willChange: isHovered ? ("transform" as const) : ("auto" as const),
      transition: "transform 250ms ease-out",
    }),
    [tilt.x, tilt.y, isHovered],
  )

  const imageContainerStyle = useMemo(
    () => ({
      transform: isHovered ? "scale(1.1)" : "scale(1)",
      boxShadow: isHovered ? "0 0 20px rgba(138,0,0,0.5)" : "none",
      transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
    }),
    [isHovered],
  )

  return (
    <div className="perspective-1000 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
      <div
        ref={cardRef}
        className={`relative bg-black/80 p-6 text-center preserve-3d ${
          isVisible ? `animate-fadeInUp stagger-${index + 2}` : "opacity-0"
        }`}
        style={cardStyle}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-testid={`card-member-${index}`}
      >
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-primary" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary" />

        <div
          className="absolute top-2 left-8 right-8 flex justify-between text-[8px] font-mono text-[#a8b2c1]"
          style={{ textShadow: "0 0 8px rgba(168, 178, 193, 0.6), 0 0 16px rgba(138, 0, 0, 0.3)" }}
        >
          <span>{"<FILE>"}</span>
          <span>{`ID:${member.id}`}</span>
        </div>
        <div
          className="absolute bottom-2 left-8 right-8 flex justify-between text-[8px] font-mono text-[#a8b2c1]"
          style={{ textShadow: "0 0 8px rgba(168, 178, 193, 0.6), 0 0 16px rgba(138, 0, 0, 0.3)" }}
        >
          <span>{"</FILE>"}</span>
          <span>STATUS:ACTIVE</span>
        </div>

        <div className="relative inline-block mb-4 mt-4">
          <div className="relative w-28 h-28 mx-auto overflow-hidden" style={imageContainerStyle}>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary z-10" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary z-10" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary z-10" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary z-10" />

            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              width={112}
              height={112}
              className={`w-full h-full object-cover ${
                isHovered
                  ? "grayscale-0 sepia-0 saturate-100 hue-rotate-0 brightness-100 contrast-100"
                  : "grayscale sepia saturate-[300%] hue-rotate-[-20deg] brightness-90 contrast-110"
              }`}
              style={{ transition: "filter 0.3s" }}
            />

            <div
              className={`absolute inset-0 pointer-events-none z-10 ${isHovered ? "opacity-0" : "opacity-40"}`}
              style={{
                background: "linear-gradient(180deg, rgba(138,0,0,0.3) 0%, rgba(60,0,0,0.5) 100%)",
                mixBlendMode: "overlay",
                transition: "opacity 0.3s",
              }}
            />

            {isHovered && (
              <>
                <div
                  className="absolute inset-0 z-30 pointer-events-none animate-pulse opacity-20"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(138,0,0,0.5) 50%, transparent 100%)",
                    animation: "glitch-slide 0.3s infinite",
                    willChange: "transform",
                  }}
                />
                <div
                  className="absolute inset-0 z-30 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 30px rgba(138,0,0,0.3)" }}
                />
              </>
            )}

            <div
              className={`absolute left-0 right-0 h-[2px] bg-primary/60 z-30 ${isHovered ? "opacity-100" : "opacity-0"}`}
              style={{
                top: "30%",
                animation: isHovered ? "scan-line 2s infinite" : "none",
                willChange: isHovered ? "transform" : "auto",
                transition: "opacity 0.3s",
              }}
            />
          </div>

          <div
            className="absolute -bottom-2 left-1/2 bg-primary/90 px-2 py-0.5 z-40"
            style={{ transform: "translateX(-50%)" }}
          >
            <span className="text-[10px] font-mono text-black font-bold tracking-wider">CLASSIFIED</span>
          </div>
        </div>

        <h3
          className="text-xl font-bold mb-1 font-mono uppercase tracking-wider text-foreground mt-4"
          data-testid={`text-member-name-${index}`}
        >
          {member.name}
        </h3>

        <p
          className="font-mono text-xs mb-1 text-[#c44]"
          style={{ textShadow: "0 0 10px rgba(204, 68, 68, 0.7), 0 0 20px rgba(138, 0, 0, 0.4)" }}
        >
          [{member.role.toUpperCase()}]
        </p>
        <p
          className="font-mono text-[10px] mb-4 text-[#8a9aaa]"
          style={{ textShadow: "0 0 6px rgba(138, 154, 170, 0.5), 0 0 12px rgba(138, 0, 0, 0.2)" }}
        >
          REF#{member.id} | CLEARANCE:ALPHA
        </p>

        {member.social && (
          <div className="flex justify-center gap-3">
            {member.social.map((social, sIndex) => (
              <a
                key={sIndex}
                href={social.url}
                className="relative w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-primary/20 group"
                style={{ transition: "background-color 0.2s ease-out, transform 0.2s ease-out" }}
                data-testid={`link-social-${index}-${sIndex}`}
              >
                <div
                  className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50 group-hover:border-primary"
                  style={{ transition: "border-color 0.2s" }}
                />
                <div
                  className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50 group-hover:border-primary"
                  style={{ transition: "border-color 0.2s" }}
                />
                <span className="text-sm font-mono text-primary">{social.type === "facebook" ? "f" : "✉"}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
