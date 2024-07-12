import ReferenceNumberInput from './form/ReferenceInput';

export default function Home() {
  return (
    <main>
      <header className='flex flex-col gap-1 items-center text-center'>
        <h1 className='text-3xl sm:text-5xl font-extralight'>
          Registration Form
        </h1>
        <p className='text-sm sm:text-base text-gray-600'>
          Registration form for first year students
        </p>
      </header>
      <div className='mt-10'>
        <ReferenceNumberInput />
      </div>
    </main>
  );
}
