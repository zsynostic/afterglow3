import { useState, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card } from '@/components/ui/card';

interface TeamMember {
  name: string;
  role: string;
  email?: string;
  social?: { type: string; url: string }[];
}

interface Tilt3D {
  x: number;
  y: number;
}

export function TeamMembersSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardTilts, setCardTilts] = useState<{ [key: number]: Tilt3D }>({});
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const teamMembers: TeamMember[] = [
    {
      name: 'Trần Ngọc Dũng',
      role: 'Trưởng nhóm',
      social: [
        { type: 'facebook', url: '#' },
        { type: 'mail', url: '#' },
      ],
    },
    {
      name: 'Ngô Đại Thiên Phúc',
      role: 'Chỉnh sửa video',
      social: [
        { type: 'facebook', url: '#' },
        { type: 'mail', url: '#' },
      ],
    },
    {
      name: 'Trần Nguyễn Hoàng Huy',
      role: 'Website',
      social: [
        { type: 'facebook', url: '#' },
        { type: 'mail', url: '#' },
      ],
    },
    {
      name: 'Từ Nguyễn Thuận Thiên',
      role: 'Kịch bản',
      social: [
        { type: 'facebook', url: '#' },
        { type: 'mail', url: '#' },
      ],
    },
    {
      name: 'Võ Đăng Khôi',
      role: 'Kịch bản',
      social: [
        { type: 'facebook', url: '#' },
        { type: 'mail', url: '#' },
      ],
    },
  ];

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

    setCardTilts((prev) => ({
      ...prev,
      [index]: { x: y * 15, y: -x * 15 },
    }));
  };

  const handleCardMouseLeave = (index: number) => {
    setCardTilts((prev) => ({
      ...prev,
      [index]: { x: 0, y: 0 },
    }));
  };

  return (
    <section
      id="members"
      ref={ref}
      className="py-20 bg-muted/20"
      data-testid="section-members"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 gradient-text-animated font-[family-name:var(--font-display)] ${
              isVisible ? 'animate-fadeInUp' : 'opacity-0'
            }`}
            data-testid="text-members-title"
          >
            Thành viên nhóm
          </h2>
          <p
            className={`text-xl text-muted-foreground ${
              isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'
            }`}
          >
            Đội ngũ thành viên đầy nhiệt huyết và tận tâm
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => {
            const tilt = cardTilts[index] || { x: 0, y: 0 };
            return (
            <div
              key={index}
              className="perspective-1000 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
            >
            <Card
              ref={(el) => (cardRefs.current[index] = el)}
              className={`p-6 text-center border-card-border hover:shadow-2xl transition-all duration-300 group preserve-3d ${
                isVisible ? `animate-fadeInUp stagger-${index + 2}` : 'opacity-0'
              }`}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
                  hoveredCard === index ? 1.05 : 1
                })`,
              }}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => {
                setHoveredCard(null);
                handleCardMouseLeave(index);
              }}
              data-testid={`card-member-${index}`}
            >
              <div className="relative inline-block mb-4">
                <div
                  className={`w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto flex items-center justify-center transition-transform duration-500 ${
                    hoveredCard === index ? 'scale-110 rotate-6' : 'scale-100'
                  }`}
                >
                  <i className="ri-user-line text-4xl text-primary" />
                </div>
                {hoveredCard === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl animate-pulse" />
                )}
              </div>

              <h3
                className="text-xl font-semibold mb-2 font-[family-name:var(--font-display)]"
                data-testid={`text-member-name-${index}`}
              >
                {member.name}
              </h3>
              <p className="text-primary font-medium mb-4">{member.role}</p>

              {member.social && (
                <div className="flex justify-center gap-3">
                  {member.social.map((social, sIndex) => (
                    <a
                      key={sIndex}
                      href={social.url}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary hover:to-secondary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1"
                      data-testid={`link-social-${index}-${sIndex}`}
                    >
                      <i className={`ri-${social.type}-line text-lg`} />
                    </a>
                  ))}
                </div>
              )}
            </Card>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
