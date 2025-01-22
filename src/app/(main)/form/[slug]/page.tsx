import { getStudentByNationalId } from '@/server/students/actions';
import RegistrationForm from './RegistrationForm';
import StudentPicker from './StudentPicker';

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    ref?: string;
  };
};

export default async function FormPage({
  params: { slug },
  searchParams,
}: Props) {
  const reference = searchParams.ref || '';
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
