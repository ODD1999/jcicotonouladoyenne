import EventDetail from '@/components/events/EventDetail';

export default function EventPage({ params }: { params: { id: string } }) {
  // Données mockées - À remplacer par un fetch depuis votre API/base de données
  const event = {
    id: parseInt(params.id),
    title: 'Leadership Academy 2024 - Formation Intensive',
    description: 'Rejoignez notre programme phare de développement du leadership ! Cette formation intensive de 6 mois est conçue pour transformer les jeunes professionnels en leaders visionnaires capables de conduire le changement dans leurs organisations et communautés. Au programme : masterclasses avec des experts internationaux, ateliers pratiques, coaching personnalisé, et projets d\'impact réel. Vous développerez des compétences essentielles en communication, gestion d\'équipe, prise de décision stratégique, et innovation. Cette expérience unique vous permettra également de rejoindre un réseau d\'alumni influents et de bénéficier d\'un mentorat de qualité.',
    type: 'Formation',
    date: '15 Mars 2024',
    time: '09:00 - 17:00',
    location: 'Hôtel du Port, Cotonou',
    attendees: '50',
    price: 'Gratuit pour membres',
    status: 'upcoming' as const,
    image: '/hero/hero2.jpg',
    organizer: 'Commission Formation JCI',
    organizerRole: 'Responsable Développement',
    organizerImage: '/hero/hero1.jpg',
    program: [
      '09:00 - 09:30 : Accueil et networking',
      '09:30 - 11:00 : Masterclass - Les fondamentaux du leadership moderne',
      '11:00 - 11:15 : Pause café',
      '11:15 - 13:00 : Atelier pratique - Communication et influence',
      '13:00 - 14:00 : Déjeuner networking',
      '14:00 - 15:30 : Session - Gestion d\'équipe et délégation efficace',
      '15:30 - 15:45 : Pause',
      '15:45 - 17:00 : Projet de groupe et présentation',
    ],
    requirements: [
      'Être membre actif de JCI Cotonou ou avoir une invitation',
      'Avoir entre 18 et 40 ans',
      'Être motivé à développer ses compétences en leadership',
      'S\'engager à participer à toutes les sessions du programme',
      'Apporter son ordinateur portable pour les ateliers pratiques',
    ],
    gallery: [
      {
        id: 1,
        type: 'image' as const,
        url: '/hero/hero1.jpg',
        thumbnail: '/hero/hero1.jpg',
        caption: 'Session d\'ouverture de la Leadership Academy 2023',
      },
      {
        id: 2,
        type: 'image' as const,
        url: '/hero/hero2.jpg',
        thumbnail: '/hero/hero2.jpg',
        caption: 'Atelier pratique sur la communication',
      },
      {
        id: 3,
        type: 'video' as const,
        url: '/hero/hero3.jpg',
        thumbnail: '/hero/hero3.jpg',
        caption: 'Témoignage des participants - Édition 2023',
      },
      {
        id: 4,
        type: 'image' as const,
        url: '/hero/hero1.jpg',
        thumbnail: '/hero/hero1.jpg',
        caption: 'Networking entre participants',
      },
      {
        id: 5,
        type: 'image' as const,
        url: '/hero/hero2.jpg',
        thumbnail: '/hero/hero2.jpg',
        caption: 'Présentation des projets de groupe',
      },
      {
        id: 6,
        type: 'image' as const,
        url: '/hero/hero3.jpg',
        thumbnail: '/hero/hero3.jpg',
        caption: 'Cérémonie de remise des certificats',
      },
    ],
  };

  const relatedEvents = [
    {
      id: 2,
      title: 'Conférence Entrepreneuriat Digital',
      type: 'Conférence',
      date: '20 Mars 2024',
      time: '14:00 - 18:00',
      location: 'Impact Hub Cotonou',
      price: '5.000 FCFA',
      image: '/hero/hero3.jpg',
    },
    {
      id: 3,
      title: 'Networking Business Breakfast',
      type: 'Networking',
      date: '25 Mars 2024',
      time: '08:00 - 10:00',
      location: 'Restaurant Le Livingstone',
      price: 'Gratuit',
      image: '/hero/hero1.jpg',
    },
    {
      id: 4,
      title: 'Atelier Innovation Sociale',
      type: 'Atelier',
      date: '30 Mars 2024',
      time: '10:00 - 16:00',
      location: 'Sèmè City',
      price: '3.000 FCFA',
      image: '/hero/hero2.jpg',
    },
  ];

  return <EventDetail event={event} relatedEvents={relatedEvents} />;
}
