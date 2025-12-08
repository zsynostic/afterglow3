"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"

const NAV_ITEMS = [
  { id: "home", label: "00_TRANG_CHỦ" },
  { id: "about", label: "01_GIỚI_THIỆU" },
  { id: "poster", label: "02_POSTER" },
  { id: "video", label: "03_VIDEO" },
  { id: "members", label: "04_THÀNH_VIÊN" },
  { id: "contract", label: "05_HỢP_ĐỒNG" },
  { id: "contact", label: "06_LIÊN_HỆ" },
] as const

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [glitchItem, setGlitchItem] = useState<string | null>(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 100

          for (const item of [...NAV_ITEMS].reverse()) {
            const element = document.getElementById(item.id)
            if (element && element.offsetTop <= scrollPosition) {
              setActiveSection(item.id)
              break
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }, [])

  const handleMouseEnter = useCallback((id: string) => {
    setGlitchItem(id)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setGlitchItem(null)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  const headerStyle = useMemo(
    () => ({
      backgroundColor: "rgba(10, 10, 10, 0.95)",
      borderBottom: "2px solid transparent",
      borderImage:
        "repeating-linear-gradient(90deg, #550000 0px, #550000 8px, transparent 8px, transparent 12px, #550000 12px, #550000 20px, transparent 20px, transparent 28px) 1",
    }),
    [],
  )

  const logoStyle = useMemo(
    () => ({
      filter: "drop-shadow(0 0 10px rgba(138, 0, 0, 0.6))",
    }),
    [],
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-mono" style={headerStyle} data-testid="header-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="hidden md:block">
            <Image
              src="/images/afterglow-logo.png"
              alt="Afterglow Logo"
              width={120}
              height={40}
              className="object-contain"
              style={logoStyle}
            />
          </div>

          <nav className="hidden md:flex items-center justify-center flex-1 gap-1" data-testid="nav-desktop">
            {NAV_ITEMS.map((item, index) => (
              <NavItem
                key={item.id}
                item={item}
                index={index}
                isActive={activeSection === item.id}
                isGlitching={glitchItem === item.id}
                isLast={index === NAV_ITEMS.length - 1}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={scrollToSection}
              />
            ))}
          </nav>

          <div className="hidden md:block w-20"></div>

          <button
            className="md:hidden px-3 py-2 text-xs tracking-wider uppercase hover:bg-[#550000]/20 active:bg-[#550000]/30"
            onClick={toggleMobileMenu}
            style={{
              color: "#a0a0a0",
              border: "1px dashed #550000",
              transition: "background-color 0.2s ease-out",
            }}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? "[X]_CLOSE" : "[=]_MENU"}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <MobileMenu
          items={NAV_ITEMS}
          activeSection={activeSection}
          logoStyle={logoStyle}
          onItemClick={scrollToSection}
        />
      )}
    </header>
  )
}

interface NavItemProps {
  item: { id: string; label: string }
  index: number
  isActive: boolean
  isGlitching: boolean
  isLast: boolean
  onMouseEnter: (id: string) => void
  onMouseLeave: () => void
  onClick: (id: string) => void
}

function NavItem({ item, index, isActive, isGlitching, isLast, onMouseEnter, onMouseLeave, onClick }: NavItemProps) {
  const buttonStyle = useMemo(
    () => ({
      color: isActive ? "#ff0000" : isGlitching ? "#ffcc00" : "#a0a0a0",
      textShadow: isActive ? "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000" : "none",
      transform: isGlitching ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : "none",
      willChange: isGlitching ? ("transform" as const) : ("auto" as const),
    }),
    [isActive, isGlitching],
  )

  return (
    <div className="flex items-center">
      <button
        onClick={() => onClick(item.id)}
        onMouseEnter={() => onMouseEnter(item.id)}
        onMouseLeave={onMouseLeave}
        className="relative text-xs tracking-wider px-3 py-2 uppercase hover:scale-105 active:scale-100"
        style={{
          ...buttonStyle,
          transition: "transform 0.2s ease-out, color 0.2s ease-out",
        }}
        data-testid={`nav-link-${item.id}`}
      >
        {isActive ? `[ ${item.label} ]` : item.label}
      </button>
      {!isLast && (
        <span className="text-[10px] mx-1" style={{ color: "#444" }}>
          //
        </span>
      )}
    </div>
  )
}

interface MobileMenuProps {
  items: readonly { id: string; label: string }[]
  activeSection: string
  logoStyle: React.CSSProperties
  onItemClick: (id: string) => void
}

function MobileMenu({ items, activeSection, logoStyle, onItemClick }: MobileMenuProps) {
  return (
    <div
      className="md:hidden animate-fadeIn"
      style={{
        backgroundColor: "rgba(10, 10, 10, 0.98)",
        borderTop: "1px dashed #550000",
      }}
      data-testid="nav-mobile-menu"
    >
      <nav className="px-4 py-4 space-y-1">
        <div className="mb-3 pb-2" style={{ borderBottom: "1px dashed #333" }}>
          <Image
            src="/images/afterglow-logo.png"
            alt="Afterglow Logo"
            width={100}
            height={35}
            className="object-contain"
            style={logoStyle}
          />
        </div>
        {items.map((item) => (
          <button
            key={item.id}
            className="w-full text-left py-2 px-3 text-xs tracking-wider uppercase hover:bg-[#550000]/10 active:bg-[#550000]/20"
            onClick={() => onItemClick(item.id)}
            style={{
              color: activeSection === item.id ? "#ff0000" : "#a0a0a0",
              textShadow: activeSection === item.id ? "0 0 10px #ff0000" : "none",
              borderLeft: activeSection === item.id ? "2px solid #ff0000" : "2px solid transparent",
              transition: "all 0.2s ease-out",
            }}
            data-testid={`nav-mobile-link-${item.id}`}
          >
            {activeSection === item.id ? `> [ ${item.label} ]` : `> ${item.label}`}
          </button>
        ))}
      </nav>
    </div>
  )
}
