import { useState, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';

export function PosterSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const posterRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!posterRef.current) return;
    const rect = posterRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setTilt({ x: y * 10, y: -x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const keyFindings = [
    'Hiểu rõ nguyên nhân gốc rễ của sự thiếu hiểu biết',
    'Xác định rào cản trong việc tiếp thu kiến thức',
    'Phương pháp giáo dục hiệu quả cho các đối tượng khác nhau',
    'Vai trò của truyền thông và công nghệ trong việc chống lại sự thiếu hiểu biết',
  ];

  return (
    <section
      id="poster"
      ref={ref}
      className="py-20 bg-background"
      data-testid="section-poster"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 gradient-text-animated font-[family-name:var(--font-display)] ${
              isVisible ? 'animate-fadeInUp' : 'opacity-0'
            }`}
            data-testid="text-poster-title"
          >
            Poster Dự Án
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto ${
              isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'
            }`}
          >
            Khám phá những phát hiện của chúng tôi về sự thiếu hiểu biết và cách thay đổi
            thông qua giáo dục
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`perspective-1000 ${
              isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'
            }`}
          >
            <div
              ref={posterRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative preserve-3d transition-transform duration-300"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
              data-testid="poster-3d-container"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://placehold.co/600x800/4285f4/ffffff?text=Afterglow+Research+Poster"
                  alt="Research Poster"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
              </div>

              <div
                className="absolute -bottom-20 left-0 right-0 h-20 opacity-30 blur-lg"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(66, 133, 244, 0.3), transparent)',
                  transform: 'rotateX(180deg) scaleY(0.3)',
                }}
              />
            </div>
          </div>

          <div
            className={`space-y-6 ${
              isVisible ? 'animate-fadeInUp stagger-3' : 'opacity-0'
            }`}
          >
            <div>
              <h3
                className="text-3xl font-bold mb-3 font-[family-name:var(--font-display)]"
                data-testid="text-poster-subtitle"
              >
                Ignorance – Can it be Changed? How?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Nghiên cứu của chúng tôi khám phá hiện tượng thiếu hiểu biết trong xã hội
                hiện đại và xác định các phương pháp hiệu quả để giải quyết thông qua các
                sáng kiến giáo dục và nâng cao nhận thức.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4">Phát Hiện Chính</h4>
              <ul className="space-y-3">
                {keyFindings.map((finding, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 group"
                    data-testid={`finding-${index}`}
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <i className="ri-check-line text-primary text-sm" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {finding}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                className="bg-gradient-to-r from-primary to-primary/80"
                data-testid="button-download-poster"
              >
                <i className="ri-download-line mr-2" />
                Tải Poster
              </Button>
              <Button variant="outline" data-testid="button-learn-more">
                <i className="ri-information-line mr-2" />
                Tìm Hiểu Thêm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
