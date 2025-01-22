import { getStudentByNationalId } from '@/server/students/actions';
import RegistrationForm from './RegistrationForm';
import StudentPicker from './StudentPicker';

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    ref?: string;
  }>;
};

export default async function FormPage({ params, searchParams }: Props) {
  const reference = (await searchParams).ref || '';
  const { slug } = await params;
  const student = await getStudentByNationalId(slug);

  return (
    <main className='py-10'>
      {student ? (
        <StudentPicker reference={reference} nationalId={slug} obj={student} />
      ) : (
        <RegistrationForm reference={reference} nationalId={slug} />
      )}
    </main>
  );
}
