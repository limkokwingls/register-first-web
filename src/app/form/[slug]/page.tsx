import React from 'react';
import RegistrationForm from './RegistrationForm';
import { getRegistration } from '../service';
import { Timestamp } from 'firebase/firestore';
import StudentInfo from '@/app/models/StudentInfo';
import StudentPicker from './StudentPicker';

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    ref?: string;
  };
};

export default async function FormPage({ params: { slug }, searchParams }: Props) {
  const res = (await getRegistration(slug)) as StudentInfo;
  const dateOfBirth = timestampToDate(res?.dateOfBirth);
  const reference = searchParams.ref || '';

  const obj = {
    ...res,
    dateOfBirth,
  };

  return (
    <main className='py-10'>
      {res ? (
        <StudentPicker reference={reference} obj={obj} />
      ) : (
        <RegistrationForm reference={reference} nationalId={slug} />
      )}
    </main>
  );
}

function timestampToDate(dateOfBirth: Timestamp | any) {
  if (dateOfBirth) {
    return dateOfBirth.toDate().toISOString().split('T')[0];
  }
  return '';
}
