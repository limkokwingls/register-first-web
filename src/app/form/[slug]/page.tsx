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
};

export default async function FormPage({ params: { slug } }: Props) {
  const res = (await getRegistration(slug)) as StudentInfo;
  const dateOfBirth = timestampToDate(res?.dateOfBirth);

  const obj = {
    ...res,
    dateOfBirth,
  };

  return (
    <main className='py-10'>
      {obj ? (
        <StudentPicker reference={slug} obj={obj} />
      ) : (
        <RegistrationForm reference={slug} />
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
