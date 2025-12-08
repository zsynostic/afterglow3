"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const teamMembers = [
  { stt: 1, mssv: "25127146", name: "Từ Nguyễn Thuận Thiên", email: "tntthien2535@clc.fitus.edu.vn", isLeader: false },
  { stt: 2, mssv: "25127309", name: "Trần Ngọc Dũng", email: "tndung2533@clc.fitus.edu.vn", isLeader: true },
  { stt: 3, mssv: "25127354", name: "Trần Nguyễn Hoàng Huy", email: "tnhhuy2531@clc.fitus.edu.vn", isLeader: false },
  { stt: 4, mssv: "25127395", name: "Võ Đăng Khôi", email: "vdkhoi2530@clc.fitus.edu.vn", isLeader: false },
  { stt: 5, mssv: "25127461", name: "Ngô Đại Thiên Phúc", email: "ndtphuc2524@clc.fitus.edu.vn", isLeader: false },
  { stt: 6, mssv: "25127488", name: "Đào Hải Sơn", email: "dhson2506@clc.fitus.edu.vn", isLeader: false },
]

const mustDoRules = [
  "Mỗi thành viên phải hoàn thành đầy đủ và đúng thời hạn các nhiệm vụ được giao theo kế hoạch chung của nhóm.",
  "Thành viên phải có thái độ hòa đồng, tôn trọng, hợp tác và hỗ trợ lẫn nhau trong suốt quá trình làm việc.",
  "Thành viên phải đóng góp năng lực, thời gian và ý tưởng một cách tích cực và hướng đến lợi ích chung của nhóm.",
  "Thành viên phải nghiêm túc, trung thực và tận tâm trong quá trình thực hiện nhiệm vụ, không làm việc qua loa, đối phó hoặc thiếu trách nhiệm.",
  "Khi gặp khó khăn, vướng mắc hoặc trở ngại trong công việc, thành viên phải chủ động thông báo sớm cho nhóm để được hỗ trợ kịp thời.",
  "Thành viên phải phản hồi các thông báo từ nhóm trưởng hoặc các thành viên khác trong vòng 24 giờ kể từ khi nhận được.",
  "Thành viên phải biết giữ gìn hình ảnh và uy tín của nhóm, tuyệt đối không được tiết lộ bất kỳ nội dung nào của nhóm ra bên ngoài khi chưa được cho phép.",
]

const mustNotDoRules = [
  "Thành viên không được lười biếng, thờ ơ hoặc trốn tránh trách nhiệm được giao. Không được cố tình né tránh tham gia vào hoạt động chung của nhóm.",
  "Thành viên không được xúc phạm, lăng mạ, nói xấu hoặc có bất kỳ hành vi nào gây tổn thương danh dự, phẩm chất, uy tín của các thành viên khác.",
  "Thành viên không được trễ hạn trong việc nộp sản phẩm, hoàn thành nhiệm vụ hoặc phản hồi nhóm (trừ khi có lý do chính đáng).",
  "Thành viên không được vắng mặt trong các buổi họp nhóm mà không thông báo trước ít nhất 1 giờ hoặc không có lý do chính đáng.",
  "Thành viên không được tự ý thay đổi nội dung, tiến độ hoặc phân công công việc trên Folder Google Drive nhóm khi chưa được cho phép.",
  "Thành viên không được phép gian lận, chiếm công, sao chép nội dung của người khác hoặc lạm dụng AI mà không thông qua ý kiến của nhóm.",
]

const shouldDoRules = [
  "Thành viên nên tham gia đúng giờ tất cả các buổi họp nhóm theo lịch đã thống nhất.",
  "Thành viên nên tích cực trao đổi, tương tác và đóng góp ý kiến trong các buổi họp hoặc trong quá trình làm việc.",
  "Thành viên nên tập trung vào nội dung cuộc họp, tránh làm việc riêng.",
  "Thành viên nên chủ động đề xuất ý tưởng, giải pháp mới hoặc hỗ trợ các thành viên khác khi cần thiết.",
  "Thành viên nên ghi nhận, học hỏi, cảm ơn hoặc khích lệ đóng góp của người khác.",
]

const rewardRules = [
  'Hoàn thành đầy đủ và đúng hạn các nhiệm vụ được giao sẽ được ghi nhận "Hoàn thành xuất sắc công việc" và thưởng 1 điểm.',
  "Hỗ trợ người khác hoàn thành nhiệm vụ hoặc có đóng góp ý kiến mang tính xây dựng sẽ được thưởng 1 điểm.",
  "Có ý tưởng sáng tạo, hiệu quả, góp phần nâng cao chất lượng sản phẩm sẽ được thưởng 1 điểm.",
  "Chủ động, có tinh thần trách nhiệm cao, năng lượng tích cực sẽ được thưởng 1 điểm. Nếu vượt trội ngoài mong đợi thì thêm 1 điểm (tối đa 2 điểm).",
]

const penaltyRules = [
  "Họp trễ quá 15 phút mà không báo trước tối thiểu 1 giờ: trừ 2 điểm và phạt 5.000 VNĐ.",
  "Không phản hồi tin nhắn trong vòng 24 giờ: trừ 2 điểm và phạt 5.000 VNĐ.",
  "Không thực hiện nhiệm vụ được giao hoặc bỏ bê công việc: vi phạm nghiêm trọng, có thể bị loại khỏi nhóm.",
  'Hoàn thành nhiệm vụ không đúng hạn, sai yêu cầu hoặc làm việc thiếu nghiêm túc: trừ 2 điểm và đánh giá "Chưa hoàn thành".',
  "Nói tục, gây xung đột, xúc phạm hoặc phá hoại tinh thần làm việc nhóm: trừ 4 điểm và cấm thực hiện nhiệm vụ 1 tuần.",
  "Vi phạm từ 2 lần trở lên: nhắc nhở trực tiếp và xem xét giảm điểm. Tổng điểm phạt vượt 6 điểm sẽ bị loại khỏi nhóm.",
]

const communicationPlan = [
  { label: "Tần suất gặp mặt", value: "2 lần/tuần" },
  { label: "Thời gian", value: "Thứ 3 (13:30 – 14:15) và Thứ 7 (10:00 – 10:45)" },
  { label: "Địa điểm", value: "Online qua Google Meet" },
  { label: "Thông báo qua", value: "Tin nhắn (Messenger)" },
  { label: "Thông báo trước", value: "Tối thiểu 24h" },
]

export function ContractSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <section
      id="contract"
      ref={ref}
      className="py-20 bg-muted/30 relative overflow-hidden"
      data-testid="section-contract"
    >
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="limbus-container inline-block px-8 py-4 mb-6">
            <h2
              className={`text-4xl sm:text-5xl font-bold font-mono text-primary glow-text ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              [HỢP_ĐỒNG_THÀNH_LẬP_NHÓM]
            </h2>
          </div>
          <p
            className={`text-xl text-muted-foreground font-mono ${isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"}`}
          >
            // QUY_TẮC_VÀ_KẾ_HOẠCH_GIAO_TIẾP_NHÓM_AFTERGLOW
          </p>
        </div>
        <div className={`limbus-container overflow-hidden ${isVisible ? "animate-fadeInUp stagger-2" : "opacity-0"}`}>
          <div className="bg-black/80 px-6 py-4 border-b border-dashed border-[#8a0000]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#8a0000]" />
              <div className="w-2 h-2 bg-[#666]" />
              <div className="w-2 h-2 bg-[#333]" />
              <span className="ml-4 text-xs text-[#8a0000] font-mono tracking-wider">
                CONTRACT_FILE :: AFTERGLOW_TEAM :: KỸ_NĂNG_MỀM
              </span>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-dashed border-[#8a0000]/50 bg-black/60">
              <TabsList className="w-full justify-start rounded-none bg-transparent h-auto p-0 gap-0">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#8a0000] data-[state=active]:bg-[#8a0000]/10 data-[state=active]:text-[#8a0000] px-6 py-3 font-mono text-xs tracking-wider text-[#666] hover:text-[#8a0000] transition-colors"
                >
                  [TỔNG_QUAN]
                </TabsTrigger>
                <TabsTrigger
                  value="rules"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#8a0000] data-[state=active]:bg-[#8a0000]/10 data-[state=active]:text-[#8a0000] px-6 py-3 font-mono text-xs tracking-wider text-[#666] hover:text-[#8a0000] transition-colors"
                >
                  [NGUYÊN_TẮC]
                </TabsTrigger>
                <TabsTrigger
                  value="communication"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#8a0000] data-[state=active]:bg-[#8a0000]/10 data-[state=active]:text-[#8a0000] px-6 py-3 font-mono text-xs tracking-wider text-[#666] hover:text-[#8a0000] transition-colors"
                >
                  [GIAO_TIẾP]
                </TabsTrigger>
                <TabsTrigger
                  value="rewards"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#8a0000] data-[state=active]:bg-[#8a0000]/10 data-[state=active]:text-[#8a0000] px-6 py-3 font-mono text-xs tracking-wider text-[#666] hover:text-[#8a0000] transition-colors"
                >
                  [THƯỞNG_&_PHẠT]
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[500px] bg-black/40">
              <div className="p-8">
                <TabsContent value="overview" className="mt-0 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">📋</span>
                      Các nội dung chính
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Tài liệu này là kết quả thảo luận và nhất trí của nhóm trong lần họp mặt lần đầu tiên, xác định
                      các giá trị cốt lõi của nhóm:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Các nguyên tắc làm việc nhóm
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Kế hoạch giao tiếp của nhóm
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Các quy tắc thưởng và phạt của nhóm
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Các tiêu chí đánh giá thành viên cuối môn học
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">👥</span>
                      Thông tin nhóm
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <span className="text-sm text-muted-foreground">Mã nhóm</span>
                        <p className="font-semibold text-lg">Afterglow</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <span className="text-sm text-muted-foreground">Tên nhóm</span>
                        <p className="font-semibold text-lg">Afterglow</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left p-3 font-semibold">STT</th>
                            <th className="text-left p-3 font-semibold">MSSV</th>
                            <th className="text-left p-3 font-semibold">Họ và tên</th>
                            <th className="text-left p-3 font-semibold">Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamMembers.map((member) => (
                            <tr
                              key={member.mssv}
                              className={`border-t border-border hover:bg-muted/30 transition-colors ${
                                member.isLeader ? "bg-primary/5 font-semibold" : ""
                              }`}
                            >
                              <td className="p-3">{member.stt}</td>
                              <td className="p-3">{member.mssv}</td>
                              <td className="p-3">
                                {member.name}
                                {member.isLeader && (
                                  <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                    Nhóm trưởng
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">{member.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rules" className="mt-0 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                        ✓
                      </span>
                      Những điều PHẢI làm
                    </h3>
                    <div className="space-y-3">
                      {mustDoRules.map((rule, index) => (
                        <div
                          key={index}
                          className="flex gap-4 p-4 bg-green-500/5 border border-green-500/20 rounded-lg"
                        >
                          <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 font-semibold text-sm shrink-0">
                            {index + 1}
                          </span>
                          <p className="text-muted-foreground leading-relaxed">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                        ✕
                      </span>
                      Những điều KHÔNG ĐƯỢC làm
                    </h3>
                    <div className="space-y-3">
                      {mustNotDoRules.map((rule, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                          <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-600 font-semibold text-sm shrink-0">
                            {index + 1}
                          </span>
                          <p className="text-muted-foreground leading-relaxed">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                        👍
                      </span>
                      Những điều NÊN làm
                    </h3>
                    <div className="space-y-3">
                      {shouldDoRules.map((rule, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                          <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 font-semibold text-sm shrink-0">
                            {index + 1}
                          </span>
                          <p className="text-muted-foreground leading-relaxed">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="communication" className="mt-0 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">📅</span>
                      Kế hoạch giao tiếp nhóm
                    </h3>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {communicationPlan.map((item, index) => (
                        <div
                          key={index}
                          className="bg-muted/50 rounded-xl p-5 border border-border hover:border-primary/50 transition-colors"
                        >
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <p className="font-semibold mt-1">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <span className="text-amber-500">🔔</span>
                        Quy định phản hồi
                      </h4>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <span className="text-amber-500 mt-0.5">→</span>
                          <span>
                            Thành viên khi nhận được tin nhắn thông báo phải hồi đáp lại để chứng tỏ đã nhận và đã đọc
                            tin nhắn.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-amber-500 mt-0.5">→</span>
                          <span>
                            Nếu thành viên không hồi đáp thông báo trong vòng 24h thì sẽ nhận được một cuộc gọi điện
                            trực tiếp qua điện thoại.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rewards" className="mt-0 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                        🏆
                      </span>
                      Quy tắc thưởng
                    </h3>
                    <div className="space-y-3">
                      {rewardRules.map((rule, index) => (
                        <div
                          key={index}
                          className="flex gap-4 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg"
                        >
                          <span className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-600 shrink-0">
                            ⭐
                          </span>
                          <p className="text-muted-foreground leading-relaxed">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                        ⚠
                      </span>
                      Quy tắc phạt
                    </h3>
                    <div className="space-y-3">
                      {penaltyRules.map((rule, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                          <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-600 shrink-0">
                            ⚠
                          </span>
                          <p className="text-muted-foreground leading-relaxed">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
