import { Metadata } from 'next';
import AdherentsPage from './page';

export const metadata: Metadata = {
  title: 'Adhérents - JCI Cotonou La Doyenne',
  description: 'Liste des adhérents JCI Cotonou La Doyenne',
};

export default function Adherents() {
  return <AdherentsPage />;
}
