"use client"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export function SystemLog() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div ref={ref} className={`system-log-container ${isVisible ? "animate-fadeInUp" : "opacity-0"}`}>
      <div className="system-log-content font-mono text-sm leading-relaxed">
        {/* Line 1 - Case File ID */}
        <p className="text-[#888]">
          CASE_FILE_ID: <span className="text-white">0x25_AFTERGLOW</span>{" "}
          <span className="text-[#8a0000]">[ENCRYPTED]</span>
        </p>

        {/* Line 2 - Data Source */}
        <p className="text-[#888]">
          DATA_SOURCE: <span className="text-white">HCMUS</span> <span className="text-[#888]">//</span>{" "}
          <span className="text-white">SECTOR_VNU</span>
        </p>

        <p className="text-[#888]">
          PRIMARY_INQUIRY: <span className="text-white">&quot;</span>
          <span className="text-[#8a0000] font-bold">Ignorance</span>
          <span className="text-white"> – Can it be Changed? </span>
          <span className="text-[#8a0000] font-bold">How?</span>
          <span className="text-white">&quot;</span>
          <span className="typing-cursor animate-pulse">_</span>
        </p>

        {/* Separator dots */}
        <p className="text-[#888] mt-4 tracking-widest">..._...</p>
      </div>
    </div>
  )
}
