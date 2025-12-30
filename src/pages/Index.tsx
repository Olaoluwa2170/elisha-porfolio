import { Suspense, lazy } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";

// Lazy load sections that are below the fold
const VisionSection = lazy(() =>
  import("@/components/sections/VisionSection").then((module) => ({
    default: module.VisionSection,
  }))
);
const JourneySection = lazy(() =>
  import("@/components/sections/JourneySection").then((module) => ({
    default: module.JourneySection,
  }))
);
const WorkSection = lazy(() =>
  import("@/components/sections/WorkSection").then((module) => ({
    default: module.WorkSection,
  }))
);
const SkillsSection = lazy(() =>
  import("@/components/sections/SkillsSection").then((module) => ({
    default: module.SkillsSection,
  }))
);
const HorizonSection = lazy(() =>
  import("@/components/sections/HorizonSection").then((module) => ({
    default: module.HorizonSection,
  }))
);
const ConnectSection = lazy(() =>
  import("@/components/sections/ConnectSection").then((module) => ({
    default: module.ConnectSection,
  }))
);

// Loading skeleton for sections
const SectionSkeleton = () => (
  <div className="w-full h-96 bg-muted/20 animate-pulse flex items-center justify-center">
    <div className="h-8 w-32 bg-muted rounded"></div>
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navigation />

      {/* Hero is above the fold, so we keep it eager loaded */}
      <HeroSection />

      <Suspense fallback={<SectionSkeleton />}>
        <VisionSection />
        <JourneySection />
        <WorkSection />
        <SkillsSection />
        <HorizonSection />
        <ConnectSection />
      </Suspense>
    </main>
  );
};

export default Index;
