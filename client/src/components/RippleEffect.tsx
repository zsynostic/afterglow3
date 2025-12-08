import { useState, PropsWithChildren } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface RippleCardProps extends PropsWithChildren {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  'data-testid'?: string;
  style?: React.CSSProperties;
}

export function RippleCard({
  children,
  className = '',
  onClick,
  'data-testid': dataTestId,
  style,
}: RippleCardProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() + Math.random() };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    onClick?.(e);
  };

  return (
    <div
      className={className}
      onClick={handleClick}
      data-testid={dataTestId}
      style={style}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-primary/30 pointer-events-none z-10"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            animation: 'ripple 600ms ease-out',
          }}
        />
      ))}
    </div>
  );
}

export function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() + Math.random() };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  const RippleContainer = () => (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-primary/30 pointer-events-none z-10"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            animation: 'ripple 600ms ease-out',
          }}
        />
      ))}
    </>
  );

  return { addRipple, RippleContainer };
}
