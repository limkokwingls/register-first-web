import React from 'react';
import RegistrationForm from './RegistrationForm';

type Props = {
  params: {
    slug: string;
  };
};

export default function FormPage({ params: { slug } }: Props) {
  return (
    <main className='py-10'>
      <RegistrationForm reference={slug} />
    </main>
  );
}
