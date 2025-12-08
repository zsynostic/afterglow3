"use client"

export function WatchingEye() {
  return (
    <div className="watching-eye">
      <svg viewBox="0 0 200 100" className="eye-svg">
        {/* Outer eye shape */}
        <path
          d="M10 50 Q100 0 190 50 Q100 100 10 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="eye-outline"
        />
        {/* Inner eye shape */}
        <path
          d="M30 50 Q100 20 170 50 Q100 80 30 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="eye-inner"
        />
        {/* Iris */}
        <circle cx="100" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" className="eye-iris" />
        {/* Pupil */}
        <circle cx="100" cy="50" r="12" fill="currentColor" className="eye-pupil" />
        {/* Reflection */}
        <circle cx="106" cy="44" r="4" fill="rgba(255,255,255,0.1)" />
        {/* Geometric lines */}
        <line x1="100" y1="20" x2="100" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="100" y1="65" x2="100" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="70" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="115" y1="50" x2="130" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  )
}
