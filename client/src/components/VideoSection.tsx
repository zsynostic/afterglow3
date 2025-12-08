import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function VideoSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="video"
      ref={ref}
      className="py-20 bg-background"
      data-testid="section-video"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 gradient-text-animated font-[family-name:var(--font-display)] ${
              isVisible ? 'animate-fadeInUp' : 'opacity-0'
            }`}
            data-testid="text-video-title"
          >
            Video
          </h2>
          <p
            className={`text-xl text-muted-foreground ${
              isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'
            }`}
          >
            Video giới thiệu dự án Afterglow
          </p>
        </div>

        <div
          className={`${
            isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'
          }`}
        >
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-card-border bg-card">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Afterglow Project Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
