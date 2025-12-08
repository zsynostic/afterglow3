import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { RippleCard } from '@/components/RippleEffect';

export function ObjectivesSection() {
  const { ref, isVisible } = useScrollAnimation();

  const objectives = [
    {
      icon: 'ri-search-line',
      title: 'Nghiên cứu',
      description: 'Tìm hiểu sâu về vấn đề thiếu hiểu biết trong xã hội hiện đại',
      gradient: 'from-primary to-primary/80',
      iconBg: 'from-primary/10 to-primary/20',
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Giáo dục',
      description: 'Phát triển các phương pháp giáo dục hiệu quả để nâng cao nhận thức',
      gradient: 'from-secondary to-secondary/80',
      iconBg: 'from-secondary/10 to-secondary/20',
    },
    {
      icon: 'ri-bar-chart-line',
      title: 'Phân tích',
      description: 'Đánh giá tác động của các giải pháp thông qua dữ liệu thực tế',
      gradient: 'from-accent to-accent/80',
      iconBg: 'from-accent/10 to-accent/20',
    },
    {
      icon: 'ri-team-line',
      title: 'Cộng đồng',
      description: 'Xây dựng cộng đồng học tập và chia sẻ kiến thức',
      gradient: 'from-green-500 to-green-600',
      iconBg: 'from-green-100 to-green-200',
    },
    {
      icon: 'ri-book-line',
      title: 'Tài liệu',
      description: 'Tạo ra nguồn tài liệu học tập phong phú và dễ tiếp cận',
      gradient: 'from-purple-500 to-purple-600',
      iconBg: 'from-purple-100 to-purple-200',
    },
    {
      icon: 'ri-rocket-line',
      title: 'Triển khai',
      description: 'Áp dụng các phát hiện vào thực tiễn giáo dục',
      gradient: 'from-red-500 to-red-600',
      iconBg: 'from-red-100 to-red-200',
    },
  ];

  return (
    <section
      id="objectives"
      ref={ref}
      className="py-20 bg-muted/30 relative overflow-hidden"
      data-testid="section-objectives"
    >
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 gradient-text-animated font-[family-name:var(--font-display)] ${
              isVisible ? 'animate-fadeInUp' : 'opacity-0'
            }`}
            data-testid="text-objectives-title"
          >
            Mục tiêu dự án
          </h2>
          <p
            className={`text-xl text-muted-foreground ${
              isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'
            }`}
          >
            Những mục tiêu cụ thể và chiến lược phát triển dự án
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((objective, index) => (
            <RippleCard
              key={index}
              className={`p-8 bg-card border border-card-border rounded-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group relative overflow-hidden cursor-pointer ${
                isVisible ? `animate-fadeInUp stagger-${index + 2}` : 'opacity-0'
              }`}
              data-testid={`card-objective-${index}`}
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${objective.gradient}`}
              />

              <div
                className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${objective.iconBg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <i className={`${objective.icon} text-2xl`} />
              </div>

              <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300 font-[family-name:var(--font-display)]">
                {objective.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {objective.description}
              </p>
            </RippleCard>
          ))}
        </div>
      </div>
    </section>
  );
}
