"use client"

import { useMemo } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { RedactedText } from "@/components/RedactedText"
import Image from "next/image"

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation()

  const imageFilterStyle = useMemo(
    () => ({
      filter: "grayscale(100%) sepia(30%) saturate(400%) hue-rotate(-10deg) contrast(1.1) brightness(0.8)",
    }),
    [],
  )

  const duotoneOverlayStyle = useMemo(
    () => ({
      background: "linear-gradient(180deg, rgba(139, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)",
      mixBlendMode: "multiply" as const,
    }),
    [],
  )

  const vignetteStyle = useMemo(
    () => ({
      background: "radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.7) 100%)",
    }),
    [],
  )

  const scanlineStyle = useMemo(
    () => ({
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.5) 2px, rgba(0, 0, 0, 0.5) 4px)",
      backgroundSize: "100% 8px",
      willChange: "background-position" as const,
    }),
    [],
  )

  return (
    <section id="about" ref={ref} className="py-20 bg-background relative z-10" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="hud-container inline-block px-8 py-4 mb-6">
            <h2
              className={`text-4xl sm:text-5xl font-bold font-mono text-primary glow-text ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              data-testid="text-about-title"
            >
              [GIỚI_THIỆU_ĐỀ_TÀI]
            </h2>
          </div>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto font-mono ${
              isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"
            }`}
          >
            // HIỆN_TƯỢNG_THIẾU_HIỂU_BIẾT_VÀ_CÁC_GIẢI_PHÁP_KHẢ_THI
          </p>
        </div>

        <div
          className={`hud-container-alt p-6 mb-12 max-w-4xl mx-auto ${isVisible ? "animate-fadeInUp stagger-2" : "opacity-0"}`}
        >
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            <span className="text-primary">// CLASSIFIED_BRIEFING:</span> Dự án nghiên cứu về các vấn đề xã hội nhạy cảm
            bao gồm <RedactedText>buôn người</RedactedText>, lừa đảo tại <RedactedText>Campuchia</RedactedText>, và các{" "}
            <RedactedText>bẫy</RedactedText> tuyển dụng lao động bất hợp pháp. Nghiên cứu nhằm nâng cao nhận thức về{" "}
            <RedactedText>sự thiếu hiểu biết</RedactedText> và tìm kiếm giải pháp <RedactedText>thay đổi</RedactedText>{" "}
            tình trạng này trong xã hội.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* Team Photo Frame */}
          <div className={`w-full max-w-4xl ${isVisible ? "animate-fadeInUp stagger-3" : "opacity-0"}`}>
            <div className="relative group cctv-container">
              {/* Cyberpunk corner borders */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-red-600 z-20" />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-red-600 z-20" />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-red-600 z-20" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-red-600 z-20" />

              {/* Top labels */}
              <div className="absolute -top-6 left-0 font-mono text-xs z-20 flex items-center gap-4">
                <span className="text-red-500" style={{ textShadow: "0 0 8px rgba(220, 38, 38, 0.8)" }}>
                  {"<"}LIVE_FEED{">"}
                </span>
                <span
                  className="text-gray-400 animate-pulse"
                  style={{ textShadow: "0 0 6px rgba(156, 163, 175, 0.5)" }}
                >
                  ● REC
                </span>
              </div>
              <div
                className="absolute -top-6 right-0 font-mono text-xs text-gray-400 z-20"
                style={{ textShadow: "0 0 6px rgba(156, 163, 175, 0.5)" }}
              >
                [DATA_LOG_2025]
              </div>

              {/* Main image container */}
              <div className="aspect-[16/9] bg-black relative overflow-hidden border border-red-900/50">
                <Image
                  src="/images/team-photo.jpg"
                  alt="Afterglow Team Photo"
                  fill
                  className="object-cover group-hover:brightness-110 group-hover:contrast-100"
                  style={{
                    ...imageFilterStyle,
                    transition: "filter 0.3s, brightness 0.3s, contrast 0.3s",
                  }}
                  sizes="(max-width: 768px) 100vw, 896px"
                />

                {/* Red duotone overlay */}
                <div
                  className="absolute inset-0 pointer-events-none group-hover:opacity-30"
                  style={{
                    ...duotoneOverlayStyle,
                    transition: "opacity 0.3s",
                  }}
                />

                {/* Vignette effect */}
                <div className="absolute inset-0 pointer-events-none" style={vignetteStyle} />

                <div
                  className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-25 scrolling-scanlines"
                  style={scanlineStyle}
                />

                <div
                  className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-15 animated-noise"
                  style={{ willChange: "transform" }}
                />

                {/* RGB Split */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-20"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255, 0, 0, 0.1) 0%, transparent 10%, transparent 90%, rgba(0, 255, 255, 0.1) 100%)",
                    transition: "opacity 0.3s",
                  }}
                />

                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden opacity-60 group-hover:opacity-30"
                  style={{ transition: "opacity 0.3s" }}
                >
                  <div
                    className="rolling-bar absolute w-full h-8 bg-gradient-to-b from-transparent via-red-900/30 to-transparent"
                    style={{ willChange: "transform" }}
                  />
                </div>

                {/* Glitch horizontal bars */}
                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 group-hover:opacity-0"
                  style={{ transition: "opacity 0.3s" }}
                >
                  <div className="absolute h-1 w-full bg-red-600/30" style={{ top: "15%", willChange: "transform" }} />
                  <div className="absolute h-0.5 w-full bg-black/60" style={{ top: "35%", willChange: "transform" }} />
                  <div className="absolute h-2 w-full bg-red-900/40" style={{ top: "55%", willChange: "transform" }} />
                  <div className="absolute h-1 w-full bg-black/50" style={{ top: "75%", willChange: "transform" }} />
                  <div
                    className="absolute h-0.5 w-full bg-red-500/20"
                    style={{ top: "88%", willChange: "transform" }}
                  />
                </div>

                <div className="absolute inset-0 pointer-events-none signal-interference opacity-0" />

                {/* Corner data overlays */}
                <div className="absolute top-3 left-3 font-mono text-xs z-10">
                  <div
                    className="text-gray-300 bg-black/70 px-2 py-1"
                    style={{ textShadow: "0 0 6px rgba(200, 200, 200, 0.6)" }}
                  >
                    [CAM_12::UNKNOWN]
                  </div>
                </div>
                <div className="absolute top-3 right-3 font-mono text-xs z-10">
                  <div
                    className="text-red-400 bg-black/70 px-2 py-1 animate-pulse"
                    style={{ textShadow: "0 0 8px rgba(248, 113, 113, 0.8)" }}
                  >
                    ◉ RECORDING
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 font-mono text-xs z-10">
                  <div
                    className="text-gray-400 bg-black/70 px-2 py-1 timestamp-flicker"
                    style={{ textShadow: "0 0 6px rgba(156, 163, 175, 0.5)" }}
                  >
                    TIMESTAMP: 2025.12.08
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-xs z-10">
                  <div
                    className="text-gray-300 bg-black/70 px-2 py-1"
                    style={{ textShadow: "0 0 6px rgba(200, 200, 200, 0.6)" }}
                  >
                    ◇ AFTERGLOW_UNIT
                  </div>
                </div>

                {/* Center crosshair */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 group-hover:opacity-50"
                  style={{ transition: "opacity 0.3s" }}
                >
                  <div className="relative w-16 h-16">
                    <div
                      className="absolute top-0 left-1/2 w-px h-4 bg-red-500"
                      style={{ transform: "translateX(-50%)" }}
                    />
                    <div
                      className="absolute bottom-0 left-1/2 w-px h-4 bg-red-500"
                      style={{ transform: "translateX(-50%)" }}
                    />
                    <div
                      className="absolute left-0 top-1/2 w-4 h-px bg-red-500"
                      style={{ transform: "translateY(-50%)" }}
                    />
                    <div
                      className="absolute right-0 top-1/2 w-4 h-px bg-red-500"
                      style={{ transform: "translateY(-50%)" }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom labels */}
              <div
                className="absolute -bottom-6 left-0 font-mono text-xs text-gray-500 z-20"
                style={{ textShadow: "0 0 4px rgba(107, 114, 128, 0.4)" }}
              >
                SUBJECTS: 05 | STATUS: ACTIVE
              </div>
              <div
                className="absolute -bottom-6 right-0 font-mono text-xs text-red-600 z-20"
                style={{ textShadow: "0 0 8px rgba(220, 38, 38, 0.6)" }}
              >
                [CLASSIFIED::LEVEL_3]
              </div>
            </div>

            <style jsx>{`
              .scrolling-scanlines {
                animation: scrollScanlines 8s linear infinite;
              }
              @keyframes scrollScanlines {
                0% { background-position: 0 0; }
                100% { background-position: 0 100%; }
              }

              .rolling-bar {
                animation: rollingBar 4s linear infinite;
              }
              @keyframes rollingBar {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(calc(100% + 100vh)); }
              }

              .animated-noise {
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
                animation: noiseShift 0.15s steps(5) infinite;
              }
              @keyframes noiseShift {
                0% { transform: translate3d(0, 0, 0); }
                20% { transform: translate3d(-2%, 2%, 0); }
                40% { transform: translate3d(2%, -1%, 0); }
                60% { transform: translate3d(-1%, -2%, 0); }
                80% { transform: translate3d(1%, 1%, 0); }
                100% { transform: translate3d(0, 0, 0); }
              }

              .cctv-container {
                animation: cctvFlicker 0.1s steps(2) infinite;
              }
              @keyframes cctvFlicker {
                0%, 100% { filter: brightness(1); }
                50% { filter: brightness(0.97); }
              }

              .signal-interference {
                background: linear-gradient(90deg, transparent 30%, rgba(255, 0, 0, 0.1) 50%, transparent 70%);
                animation: signalFlash 5s ease-in-out infinite;
              }
              @keyframes signalFlash {
                0%, 90%, 100% { opacity: 0; }
                92% { opacity: 0.8; transform: translateX(-100%); }
                95% { opacity: 0.3; transform: translateX(100%); }
                97% { opacity: 0; }
              }

              .timestamp-flicker {
                animation: timestampFlicker 3s steps(1) infinite;
              }
              @keyframes timestampFlicker {
                0%, 94%, 96%, 98%, 100% { opacity: 1; }
                95%, 97% { opacity: 0.5; }
              }
            `}</style>
          </div>

          {/* Content Box */}
          <div className={`w-full max-w-4xl ${isVisible ? "animate-fadeInUp stagger-4" : "opacity-0"}`}>
            <div
              className="p-6 font-mono text-sm"
              style={{
                backgroundColor: "#0d0d0d",
                borderLeft: "3px solid #4a0000",
              }}
            >
              {/* Header */}
              <div className="mb-6">
                <span style={{ color: "#8b0000" }} className="font-bold">
                  [CODENAME: AFTERGLOW]
                </span>
              </div>

              <div className="space-y-4">
                {/* Quote line */}
                <p style={{ color: "#999999" }}>
                  <span style={{ color: "#8b0000" }}>"</span>
                  <span style={{ color: "#8b0000" }} className="font-semibold">
                    Afterglow
                  </span>
                  <span> - Là ánh sáng còn sót lại sau khi mặt trời đã lặn, hoặc sau một vụ nổ lớn.</span>
                  <span style={{ color: "#8b0000" }}>"</span>
                </p>

                {/* Paragraph 1 */}
                <p style={{ color: "#999999" }} className="leading-relaxed">
                  Trước thực trạng nhức nhối của nạn lừa đảo{" "}
                  <span style={{ color: "#8b0000" }}>"việc nhẹ lương cao"</span> và buôn bán người sang{" "}
                  <span style={{ color: "#8b0000" }}>Campuchia</span>, chúng tôi chọn cái tên này như một niềm hy vọng
                  giữa những gam màu tối.
                </p>

                {/* Paragraph 2 */}
                <p style={{ color: "#999999" }} className="leading-relaxed">
                  <span style={{ color: "#8b0000" }}>Sự thiếu hiểu biết</span> và những cái bẫy tâm lý tinh vi đã đẩy vô
                  số nạn nhân vào bi kịch. Nhóm được thành lập để đi sâu vào vấn đề, không né tránh sự thật, nhằm tìm
                  kiếm{" "}
                  <span style={{ color: "#8b0000" }} className="italic">
                    giải pháp nâng cao nhận thức
                  </span>{" "}
                  và ngăn chặn những nỗi đau không đáng có.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
