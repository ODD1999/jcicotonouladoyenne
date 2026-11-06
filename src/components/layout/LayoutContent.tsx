'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPresencePage = pathname === '/presence' || pathname === '/session-information' || pathname === '/preinscriptions' || pathname === '/adhesion' || pathname === '/adherents' || pathname === '/integrer' || pathname.startsWith('/full-vibes-awards');

  return (
    <>
      {!isPresencePage && <Header />}
      <main>{children}</main>
      {!isPresencePage && <Footer />}
    </>
  );
}
