import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'AXIOM – AI-Powered Resume & Interview Coach',
  description: 'Rate your resume. Practise live with an AI interviewer. Get certified — free. Privacy-first, on-device AI for every student.',
  keywords: ['resume coach', 'AI interview', 'free certifications', 'student career', 'on-device AI'],
  openGraph: {
    title: 'AXIOM – AI-Powered Resume & Interview Coach',
    description: 'Free, private AI career coaching for students. Everything runs on your device.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="relative z-10 bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}
