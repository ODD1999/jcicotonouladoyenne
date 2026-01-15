import React from 'react';
import ProjectsHero from '@/components/projects/ProjectsHero';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectImpact from '@/components/projects/ProjectImpact';

export const metadata = {
  title: 'Nos Projets | JCI Cotonou la Doyenne',
  description: 'Découvrez tous les projets de JCI Cotonou la Doyenne : formations, entrepreneuriat, actions sociales et environnementales. Des initiatives qui transforment des vies.',
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsGrid />
      <ProjectImpact />
    </>
  );
}
