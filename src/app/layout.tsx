import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProviders from "@/components/providers/ClientProviders";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "../styles/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JCI Cotonou la Doyenne - Jeune Chambre Internationale",
  description: "Former de jeunes citoyens actifs et engagés pour créer un impact positif dans notre communauté et au-delà.",
  keywords: "JCI, Cotonou, Bénin, Leadership, Formation, Jeunes, Engagement citoyen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="light">
      <body className={inter.variable}>
        <ClientProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
