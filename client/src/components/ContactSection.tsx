import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { RippleCard } from '@/components/RippleEffect';

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();

  const contactInfo = [
    {
      icon: 'ri-mail-line',
      title: 'Email',
      value: 'tndung2533@clc.fitus.edu.vn',
      link: 'mailto:tndung2533@clc.fitus.edu.vn',
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Địa chỉ',
      value: 'Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM',
      link: '#',
    },
    {
      icon: 'ri-team-line',
      title: 'Đơn vị thực hiện',
      value: 'Nhóm Afterglow - 25C05',
      link: '#',
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-muted/20"
      data-testid="section-contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 font-[family-name:var(--font-display)] gradient-text-animated ${
              isVisible ? 'animate-fadeInUp' : 'opacity-0'
            }`}
            data-testid="text-contact-title"
          >
            Liên hệ
          </h2>
          <p
            className={`text-xl text-muted-foreground ${
              isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'
            }`}
          >
            Hãy kết nối với chúng tôi để tìm hiểu thêm về dự án
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <RippleCard
              key={index}
              className={`block p-6 text-center bg-card border border-card-border rounded-xl hover:shadow-xl transition-all duration-500 hover:scale-105 group relative overflow-hidden ${
                isVisible ? `animate-fadeInUp stagger-${index + 2}` : 'opacity-0'
              }`}
              data-testid={`contact-info-${index}`}
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full group-hover:scale-110 transition-transform">
                <i className={`${info.icon} text-2xl text-primary`} />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-[family-name:var(--font-display)]">
                {info.title}
              </h3>
              <p className="text-sm text-muted-foreground">{info.value}</p>
            </RippleCard>
          ))}
        </div>

      </div>

      <footer className="limbus-footer">
        <div className="scanlines" />
        <span>
          <span className="label">PROJECT_AFTERGLOW</span> // <span className="label">ID:</span> <span className="value-gray">HCMUS_2025</span>
        </span>
        <span className="separator">|</span>
        <span>
          <span className="label">SYSTEM STATUS:</span> <span className="value-warning">UNSTABLE ⚠</span>
        </span>
        <span className="separator">|</span>
        <span>
          <span className="label">EXIT_PATH:</span> <span className="value-critical">[NOT_FOUND]</span>
        </span>
      </footer>
    </section>
  );
}
