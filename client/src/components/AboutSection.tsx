import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { RippleCard } from '@/components/RippleEffect';

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  const features = [
    {
      icon: 'ri-lightbulb-line',
      title: 'Nghiên cứu sâu rộng',
      description:
        'Phân tích toàn diện về nguyên nhân gốc rễ của sự thiếu hiểu biết trong xã hội hiện đại thông qua các phương pháp nghiên cứu khoa học.',
      gradient: 'from-primary/10 to-primary/20',
      iconColor: 'text-primary',
    },
    {
      icon: 'ri-question-line',
      title: 'Đặt câu hỏi quan trọng',
      description:
        'Khám phá những câu hỏi then chốt về bản chất của sự thiếu hiểu biết và tác động của nó đến sự phát triển xã hội và cá nhân.',
      gradient: 'from-secondary/10 to-secondary/20',
      iconColor: 'text-secondary',
    },
    {
      icon: 'ri-target-line',
      title: 'Giải pháp thực tiễn',
      description:
        'Đề xuất các phương pháp giáo dục hiệu quả và chiến lược nâng cao nhận thức có thể áp dụng trong thực tế để tạo ra thay đổi tích cực.',
      gradient: 'from-accent/10 to-accent/20',
      iconColor: 'text-accent',
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-muted/30"
      data-testid="section-about"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 font-[family-name:var(--font-display)] gradient-text-animated ${
              isVisible ? 'animate-fadeInUp' : 'opacity-0'
            }`}
            data-testid="text-about-title"
          >
            Giới thiệu đề tài
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'
            }`}
          >
            Nghiên cứu sâu về hiện tượng thiếu hiểu biết và các giải pháp khả thi để thay
            đổi tình trạng này
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <RippleCard
                key={index}
                className={`p-6 bg-card border border-card-border rounded-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden cursor-pointer ${
                  isVisible ? `animate-fadeInUp stagger-${index + 2}` : 'opacity-0'
                }`}
                data-testid={`card-feature-${index}`}
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center bg-gradient-to-br ${feature.gradient} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <i className={`${feature.icon} text-2xl ${feature.iconColor}`} />
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 group-hover:${feature.iconColor} transition-colors duration-300`}
                >
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </RippleCard>
            ))}
          </div>

          <div
            className={`relative group ${
              isVisible ? 'animate-fadeInUp stagger-5' : 'opacity-0'
            }`}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
                alt="Education and Knowledge"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
