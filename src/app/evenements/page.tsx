import React from 'react';
import EventsHero from '@/components/events/EventsHero';
import EventsGrid from '@/components/events/EventsGrid';
import UpcomingEvents from '@/components/events/UpcomingEvents';

export const metadata = {
  title: 'Événements | JCI Cotonou la Doyenne',
  description: 'Découvrez tous les événements de JCI Cotonou la Doyenne : formations, conférences, networking, ateliers et actions sociales. Inscrivez-vous dès maintenant.',
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <EventsGrid />
      <UpcomingEvents />
    </>
  );
}
