import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { VisionSection } from '@/components/sections/VisionSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { WorkSection } from '@/components/sections/WorkSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { HorizonSection } from '@/components/sections/HorizonSection';
import { ConnectSection } from '@/components/sections/ConnectSection';

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <VisionSection />
      <JourneySection />
      <WorkSection />
      <SkillsSection />
      <HorizonSection />
      <ConnectSection />
    </main>
  );
};

export default Index;
