import ArticleDetail from '@/components/news/ArticleDetail';

export default function ArticlePage({ params }: { params: { id: string } }) {
  // Données mockées - À remplacer par un fetch depuis votre API/base de données
  const article = {
    id: parseInt(params.id),
    title: 'JCI Cotonou remporte le Prix National de l\'Innovation Sociale',
    content: `
      <p>C'est avec une immense fierté que JCI Cotonou la Doyenne annonce avoir remporté le Prix National de l'Innovation Sociale lors de la cérémonie qui s'est tenue le 28 janvier 2024 au Palais des Congrès de Cotonou.</p>

      <h2>Un projet d'envergure nationale</h2>
      <p>Notre projet "Entrepreneuriat Féminin" a été récompensé pour son impact exceptionnel sur la communauté. Ce programme ambitieux a permis d'accompagner plus de 30 femmes entrepreneures dans le lancement et le développement de leurs activités.</p>

      <blockquote>
        "Cette récompense est le fruit d'un travail d'équipe remarquable et de l'engagement sans faille de nos membres. Elle témoigne de notre volonté constante d'avoir un impact positif sur notre société." - Président JCI Cotonou
      </blockquote>

      <h2>Les résultats concrets</h2>
      <p>Depuis son lancement il y a 18 mois, le projet a généré des résultats impressionnants :</p>
      <ul>
        <li>30 femmes entrepreneures accompagnées</li>
        <li>25 entreprises créées avec succès</li>
        <li>150 emplois directs et indirects créés</li>
        <li>Plus de 50 millions FCFA de chiffre d'affaires cumulé</li>
      </ul>

      <h2>Une reconnaissance nationale</h2>
      <p>Ce prix national vient couronner les efforts de toute l'équipe JCI Cotonou et renforce notre détermination à poursuivre nos actions en faveur du développement entrepreneurial au Bénin.</p>

      <h3>Les prochaines étapes</h3>
      <p>Fort de cette reconnaissance, nous prévoyons d'étendre le programme à d'autres régions du pays et d'accompagner 50 nouvelles entrepreneures d'ici la fin de l'année 2024.</p>

      <p>Nous tenons à remercier tous nos partenaires, nos membres dévoués et toutes les femmes qui ont fait confiance à notre programme. Cette récompense est la vôtre !</p>
    `,
    category: 'Récompenses',
    date: '28 Janvier 2024',
    author: 'Équipe Communication JCI',
    authorRole: 'Responsable Communication',
    authorImage: '/hero/hero1.jpg',
    readTime: '5 min',
    image: '/hero/hero1.jpg',
    views: '2.5K',
    tags: ['Innovation', 'Entrepreneuriat', 'Femmes', 'Prix', 'Impact Social'],
  };

  const relatedArticles = [
    {
      id: 2,
      title: 'Lancement du Programme Leadership Academy 2024',
      excerpt: 'Un programme intensif de 6 mois pour former la nouvelle génération de leaders béninois.',
      category: 'Formations',
      date: '25 Janvier 2024',
      image: '/hero/hero2.jpg',
      readTime: '4 min',
    },
    {
      id: 3,
      title: 'Partenariat Stratégique avec la Banque Mondiale',
      excerpt: 'Un accord de collaboration pour soutenir 100 jeunes entrepreneurs.',
      category: 'Partenariats',
      date: '20 Janvier 2024',
      image: '/hero/hero3.jpg',
      readTime: '6 min',
    },
    {
      id: 9,
      title: 'Entrepreneuriat Féminin : 30 femmes accompagnées',
      excerpt: 'Bilan positif de notre programme d\'accompagnement.',
      category: 'Projets',
      date: '05 Janvier 2024',
      image: '/hero/hero1.jpg',
      readTime: '6 min',
    },
  ];

  return <ArticleDetail article={article} relatedArticles={relatedArticles} />;
}
