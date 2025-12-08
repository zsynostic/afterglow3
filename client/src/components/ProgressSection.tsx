import { useEffect, useState, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card } from '@/components/ui/card';
import { RippleCard } from '@/components/RippleEffect';

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export function ProgressSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [stats, setStats] = useState<Stat[]>([
    { value: 0, label: 'Thành viên nhóm', suffix: '' },
    { value: 0, label: 'Tuần nghiên cứu', suffix: '+' },
    { value: 0, label: 'Phát hiện chính', suffix: '' },
    { value: 0, label: 'Tiến độ hoàn thành', suffix: '%' },
  ]);
  const hasAnimated = useRef(false);

  const targetStats: Stat[] = [
    { value: 6, label: 'Thành viên nhóm', suffix: '' },
    { value: 12, label: 'Tuần nghiên cứu', suffix: '+' },
    { value: 8, label: 'Phát hiện chính', suffix: '' },
    { value: 85, label: 'Tiến độ hoàn thành', suffix: '%' },
  ];

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setStats(
          targetStats.map((stat) => ({
            ...stat,
            value: Math.floor(stat.value * progress),
          }))
        );

        if (currentStep >= steps) {
          clearInterval(interval);
          setStats(targetStats);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section
      id="progress"
      ref={ref}
      className="py-20 bg-background"
      data-testid="section-progress"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 gradient-text-animated font-[family-name:var(--font-display)] ${
              isVisible ? 'animate-fadeInUp' : 'opacity-0'
            }`}
            data-testid="text-progress-title"
          >
            Tiến độ dự án
          </h2>
          <p
            className={`text-xl text-muted-foreground ${
              isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'
            }`}
          >
            Những con số ấn tượng về quá trình thực hiện dự án
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <RippleCard
              key={index}
              className={`p-6 text-center bg-card border border-card-border rounded-lg hover:shadow-xl transition-all duration-500 hover:scale-105 relative overflow-hidden cursor-pointer ${
                isVisible ? `animate-scaleIn stagger-${index + 2}` : 'opacity-0'
              }`}
              data-testid={`card-stat-${index}`}
            >
              <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2 font-[family-name:var(--font-display)]">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </RippleCard>
          ))}
        </div>

        <div className={isVisible ? 'animate-fadeInUp stagger-6' : 'opacity-0'}>
          <Card className="p-8 border-card-border">
            <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-display)]">
              Các mốc quan trọng
            </h3>
            <div className="space-y-4">
              {[
                {
                  phase: 'Giai đoạn 1',
                  title: 'Nghiên cứu và thu thập dữ liệu',
                  progress: 100,
                  status: 'completed',
                },
                {
                  phase: 'Giai đoạn 2',
                  title: 'Phân tích và đánh giá',
                  progress: 90,
                  status: 'in-progress',
                },
                {
                  phase: 'Giai đoạn 3',
                  title: 'Phát triển giải pháp',
                  progress: 75,
                  status: 'in-progress',
                },
                {
                  phase: 'Giai đoạn 4',
                  title: 'Triển khai và đánh giá kết quả',
                  progress: 45,
                  status: 'planned',
                },
              ].map((milestone, index) => (
                <div key={index} data-testid={`milestone-${index}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium text-primary">
                        {milestone.phase}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        {milestone.title}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">{milestone.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ${
                        isVisible ? '' : 'w-0'
                      }`}
                      style={{ width: isVisible ? `${milestone.progress}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
