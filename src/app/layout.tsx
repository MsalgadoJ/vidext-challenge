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
      <body className={`${inter.className} `}>
        <Provider>
          <div
            className={`container min-h-screen grid grid-rows-[auto_1fr_auto] border-2 border-green-800`}
          >
            <Header />
            {children}
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}

//text-[#38422C]
