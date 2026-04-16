import { DestinationsSection } from './components/destinations-section';
import { FeaturesSection } from './components/features-section';
import { FinalCtaSection } from './components/final-cta-section';
import { HeroSection } from './components/hero-section';
import { HomeMetricStrip } from './components/home-metric-strip';
import { HowItWorksSection } from './components/how-it-works-section';
import { PrecisionSection } from './components/precision-section';
import { SocialProofSection } from './components/social-proof-section';

export const HomePage = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-neutral-900">
      <HeroSection />
      <HomeMetricStrip />
      <FeaturesSection />
      <HowItWorksSection />
      <PrecisionSection />
      <DestinationsSection />
      <SocialProofSection />
      <FinalCtaSection />
    </div>
  );
};
