"use client"

import { useState } from "react"

interface RedactedTextProps {
  children: string
  className?: string
}

export function RedactedText({ children, className = "" }: RedactedTextProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <span
      className={`redacted-text ${isRevealed ? "revealed" : ""} ${className}`}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      <span className="redacted-content">{children}</span>
      <span className="redacted-block" />
    </span>
  )
}
