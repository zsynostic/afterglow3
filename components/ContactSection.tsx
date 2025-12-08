"use client"

import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation()

  const operatorData = [
    {
      id: "OPERATOR_ID",
      title: "LIÊN_LẠC_VIÊN",
      mainValue: "tndung2533",
      subValue: "@clc.fitus.edu.vn",
      status: "VERIFIED",
    },
    {
      id: "BASE_COORDINATES",
      title: "CƠ_SỞ_DỮ_LIỆU",
      mainValue: "HCMUS - VNU_HCM",
      subValue: "227 Nguyen Van Cu, Dist.5",
      status: "CONFIRMED",
    },
    {
      id: "OPERATION_CYCLE",
      title: "CHU_KỲ_DỰ_ÁN",
      mainValue: "2025 - 2026",
      subValue: "Status: ONGOING",
      status: "ACTIVE",
    },
  ]

  return (
    <section id="contact" ref={ref} className="py-20 bg-background" data-testid="section-contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="limbus-container inline-block px-8 py-4 mb-6">
            <h2
              className={`text-4xl sm:text-5xl font-bold font-mono text-primary glow-text ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              data-testid="text-contact-title"
            >
              [THÔNG_TIN_DỰ_ÁN]
            </h2>
          </div>
          <p
            className={`text-xl text-muted-foreground font-mono ${isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"}`}
          >
            {">>> TRUY_XUẤT_DỮ_LIỆU <<<"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {operatorData.map((data, index) => (
            <div
              key={data.id}
              className={`operator-block group cursor-default ${isVisible ? `animate-fadeInUp stagger-${index + 2}` : "opacity-0"}`}
              data-testid={`operator-block-${index}`}
            >
              {/* Corner brackets - camera frame style */}
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />

              {/* Content */}
              <div className="block-content">
                {/* Header with ID */}
                <div className="block-header">
                  <span className="block-id">{data.id}</span>
                  <span className="block-status">[{data.status}]</span>
                </div>

                {/* Title */}
                <h3 className="block-title">{data.title}</h3>

                {/* Divider */}
                <div className="block-divider">
                  <span>────────────</span>
                </div>

                {/* Main Value */}
                <p className="block-main-value">{data.mainValue}</p>

                {/* Sub Value */}
                <p className="block-sub-value">{data.subValue}</p>

                {/* Bottom indicator - enhanced with transition */}
                <div className="block-indicator">
                  <span className="indicator-dot transition-all duration-200 group-hover:scale-125" />
                  <span className="indicator-text">READY</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project identifier box - enhanced with hover effect */}
        <div
          className={`relative border-l-4 border-[#4a0000] bg-[#0d0d0d] p-6 font-mono text-sm transition-all duration-250 ease-out hover:border-l-[#660000] hover:bg-[#0f0f0f] ${
            isVisible ? "animate-fadeInUp stagger-5" : "opacity-0"
          }`}
        >
          {/* Opening line */}
          <p className="mb-4">
            <span className="text-[#4a0000]">{">>>"}</span>{" "}
            <span className="text-[#555555]">SYSTEM_ACCESS: FILE_RETRIEVED // DECRYPTING DATA STREAM...</span>
          </p>

          {/* Main content */}
          <div className="pl-4 space-y-2 mb-4">
            <p>
              <span className="text-[#888888] font-bold">CASE_FILE_ID:</span>{" "}
              <span className="text-[#aaaaaa]">0x25_AFTERGLOW</span> <span className="text-[#8b0000]">[ENCRYPTED]</span>
            </p>
            <p>
              <span className="text-[#888888] font-bold">DATA_SOURCE:</span>{" "}
              <span className="text-[#aaaaaa]">HCMUS</span> <span className="text-[#8b0000]">//</span>{" "}
              <span className="text-[#aaaaaa]">SECTOR_VNU</span>
            </p>
            <p>
              <span className="text-[#888888] font-bold">PRIMARY_INQUIRY:</span>{" "}
              <span className="text-[#aaaaaa]">"</span>
              <span className="text-[#8b0000]">Ignorance</span>
              <span className="text-[#aaaaaa]"> - Can it be Changed? </span>
              <span className="text-[#8b0000]">How?</span>
              <span className="text-[#aaaaaa]">"_</span>
            </p>
            <p className="text-[#555555] tracking-widest mt-2">. . . _ . . .</p>
          </div>

          {/* Closing line */}
          <p>
            <span className="text-[#4a0000]">{"<<<"}</span>{" "}
            <span className="text-[#555555]">END_TRANSMISSION // FILE_LOCKED // AWAITING_FURTHER_ANALYSIS...</span>
          </p>
        </div>
      </div>

      <footer className="limbus-footer mt-20">
        <div className="scanlines" />
        <span className="transition-colors duration-200 hover:text-[#aa0000]">
          <span className="label">PROJECT_AFTERGLOW</span> // <span className="label">ID:</span>{" "}
          <span className="value-gray">HCMUS_2025</span>
        </span>
        <span className="separator">|</span>
        <span className="transition-colors duration-200">
          <span className="label">SYSTEM_STATUS:</span> <span className="value-warning">{"UNSTABLE ⚠"}</span>
        </span>
        <span className="separator">|</span>
        <span className="transition-colors duration-200">
          <span className="label">EXIT_PATH:</span> <span className="value-critical">[NOT_FOUND]</span>
        </span>
      </footer>
    </section>
  )
}
