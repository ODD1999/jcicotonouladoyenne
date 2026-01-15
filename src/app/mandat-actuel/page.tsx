import React from 'react';
import MandateHero from '@/components/mandate/MandateHero';
import ExecutiveBoard from '@/components/mandate/ExecutiveBoard';
import ProjectsSection from '@/components/mandate/ProjectsSection';
import PartnershipsSection from '@/components/mandate/PartnershipsSection';

export const metadata = {
  title: 'Mandat Actuel | JCI Cotonou la Doyenne',
  description: 'Découvrez le mandat actuel 2024-2025 de JCI Cotonou la Doyenne : notre comité directeur, nos projets, nos réalisations et nos partenariats stratégiques.',
};

export default function MandateActuelPage() {
  return (
    <>
      <MandateHero />
      <ExecutiveBoard />
      <ProjectsSection />
      <PartnershipsSection />
    </>
  );
}
