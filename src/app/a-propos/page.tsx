import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import AffiliationSection from '@/components/about/AffiliationSection';
import FounderSection from '@/components/about/FounderSection';
import VisionMissionSection from '@/components/about/VisionMissionSection';
import ValuesSection from '@/components/about/ValuesSection';
import TimelineSection from '@/components/about/TimelineSection';
import ImpactSection from '@/components/about/ImpactSection';

export const metadata = {
  title: 'À Propos | JCI Cotonou la Doyenne',
  description: 'Découvrez l\'histoire, la mission et l\'impact de JCI Cotonou la Doyenne, première organisation de jeunes leaders au Bénin depuis plus de 60 ans.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AffiliationSection />
      <FounderSection />
      <VisionMissionSection />
      <ValuesSection />
      <TimelineSection />
      <ImpactSection />
    </>
  );
}
