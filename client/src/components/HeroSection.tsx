import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import { ParticleBackground } from './ParticleBackground';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const { ref, isVisible } = useScrollAnimation();
  const offsetY = useParallax();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background noise-overlay scanlines"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${offsetY * 0.5}px)`,
          zIndex: 0,
        }}
      >
        <ParticleBackground />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"
        style={{
          transform: `translateY(${offsetY * 0.3}px)`,
          zIndex: 1,
        }}
      />

      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        style={{
          transform: `translateY(${offsetY * 0.1}px)`,
        }}
      >
        <div className="max-w-4xl">
          <div
            className={`mb-4 ${
              isVisible ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            <span 
              className="text-6xl sm:text-8xl font-bold text-primary glitch-text font-[family-name:var(--font-display)]"
              data-text="Afterglow"
            >
              Afterglow
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight font-[family-name:var(--font-display)] ${
              isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'
            }`}
            data-testid="text-hero-title"
          >
            <span className="text-primary glow-text">Ignorance</span>
            <span className="text-foreground"> – Can it be </span>
            <br />
            <span className="text-primary glow-text">Changed?</span>
            <span className="text-foreground"> How?</span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed ${
              isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'
            }`}
            data-testid="text-hero-description"
          >
            Khám phá về sự{' '}
            <span className="text-primary glow-text-subtle font-semibold">thiếu hiểu biết</span> trong xã
            hội hiện đại và tìm kiếm những phương pháp{' '}
            <span className="text-primary glow-text-subtle font-semibold">hiệu quả</span> để thay đổi tình
            trạng này thông qua{' '}
            <span className="text-primary glow-text-subtle font-semibold">giáo dục và nâng cao nhận thức</span>.
          </p>

          <div
            className={`flex flex-wrap gap-4 ${
              isVisible ? 'animate-fadeInUp stagger-3' : 'opacity-0'
            }`}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('about')}
              className="bg-primary/20 border border-primary text-primary hover:bg-primary/30 glow-text-subtle"
              data-testid="button-explore-project"
            >
              <i className="ri-compass-3-line mr-2" />
              Khám phá dự án
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <i className="ri-arrow-down-line text-2xl text-primary glow-text animate-pulse-slow" />
      </div>
    </section>
  );
}
