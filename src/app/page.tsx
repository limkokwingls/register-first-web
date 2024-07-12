import ReferenceNumberInput from './form/ReferenceInput';

export default function Home() {
  return (
    <main>
      <h1 className='text-center text-5xl font-extralight'>
        Registration Form
      </h1>
      <div className='mt-10'>
        <ReferenceNumberInput />
      </div>
    </main>
  );
}
