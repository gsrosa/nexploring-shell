import '@/styles/home.css';
import { DestinationsSection } from './components/destinations-section';
import { FeaturesSection } from './components/features-section';
import { FinalCtaSection } from './components/final-cta-section';
import { HeroSection } from './components/hero-section';
import { HowItWorksSection } from './components/how-it-works-section';
import { PrecisionSection } from './components/precision-section';
import { SocialProofSection } from './components/social-proof-section';

export function HomePage() {
  return (
    <div className="bg-neutral-50">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PrecisionSection />
      <DestinationsSection />
      <SocialProofSection />
      <FinalCtaSection />
    </div>
  );
}
