import { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { PosterSection } from '@/components/PosterSection';
import { TeamMembersSection } from '@/components/TeamMembersSection';
import { ContractSection } from '@/components/ContractSection';
import { VideoSection } from '@/components/VideoSection';
import { ContactSection } from '@/components/ContactSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <PosterSection />
          <VideoSection />
          <TeamMembersSection />
          <ContractSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
