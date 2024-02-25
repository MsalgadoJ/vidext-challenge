import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Provider from './_trpc/Provider';
import Header from '@/components/Hearder';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VIDEXT - Generate videos with AI',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-50 `}>
        <Provider>
          <div className={`min-h-screen grid grid-rows-[1fr_auto]`}>
            <div className={`container max-w-[800px]`}>
              <Header />
              {children}
            </div>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}

//text-[#38422C]
