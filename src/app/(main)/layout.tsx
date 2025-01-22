import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Limkokwing Registration',
  description: 'Limkokwing Registration Form for TVET students',
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link className='flex justify-center' href={'/'}>
        <Image
          alt='Logo'
          src='/transparent-logo.png'
          width={280}
          height={125}
        />
      </Link>
      <div className='p-2'>{children}</div>
    </>
  );
}
