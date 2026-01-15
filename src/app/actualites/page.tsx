import NewsHero from '@/components/news/NewsHero';
import NewsGrid from '@/components/news/NewsGrid';
import NewsletterCTA from '@/components/news/NewsletterCTA';

export default function ActualitesPage() {
  return (
    <main>
      <NewsHero />
      <NewsGrid />
      <NewsletterCTA />
    </main>
  );
}
