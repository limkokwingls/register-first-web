import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Limkokwing Registration',
  description: 'Limkokwing Registration Form for new students',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Link className='flex justify-center' href={'/'}>
          <Image
            alt='Logo'
            src='/transparent-logo.png'
            width={280}
            height={125}
          />
        </Link>
        <div className='mt-10 p-2'>{children}</div>
      </body>
    </html>
  );
}
