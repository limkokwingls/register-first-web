import React from 'react';
import RegistrationForm from './RegistrationForm';
import { getRegistration } from '../service';
import { Timestamp } from 'firebase/firestore';
import RegisterModel from '@/app/models/RegisterModel';

type Props = {
  params: {
    slug: string;
  };
};

export default async function FormPage({ params: { slug } }: Props) {
  const res = (await getRegistration(slug)) as RegisterModel;
  const dateOfBirth = timestampToDate(res?.dateOfBirth);

  const obj = {
    ...res,
    dateOfBirth,
  };

  return (
    <main className='py-10'>
      <RegistrationForm reference={slug} obj={obj} />
    </main>
  );
}
function timestampToDate(dateOfBirth: Timestamp | any) {
  if (dateOfBirth) {
    return dateOfBirth.toDate().toISOString().split('T')[0];
  }
  return '';
}
