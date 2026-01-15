import React from 'react';
import GovernanceHero from '@/components/governance/GovernanceHero';
import StrategicAxesSection from '@/components/governance/StrategicAxesSection';
import DocumentsSection from '@/components/governance/DocumentsSection';
import QuinquennialPlansSection from '@/components/governance/QuinquennialPlansSection';

export const metadata = {
  title: 'Gouvernance | JCI Cotonou la Doyenne',
  description: 'Découvrez notre structure de gouvernance, nos axes stratégiques, nos documents fondamentaux et nos plans quinquennaux aux niveaux international, national et local.',
};

export default function GovernancePage() {
  return (
    <>
      <GovernanceHero />
      <StrategicAxesSection />
      <DocumentsSection />
      <QuinquennialPlansSection />
    </>
  );
}
