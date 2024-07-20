import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleCheckBig } from 'lucide-react';

export default function SuccessPage() {
  return (
    <main className='p-5 mt-5 md:w-[40vw] mx-auto'>
      <Alert>
        <CircleCheckBig className='size-4' color='green' />
        <AlertTitle>Successful</AlertTitle>
        <AlertDescription className='text-black'>
          Please ensure you complete your registration in person at Limkokwing
          University. Registration Dates are as follows:
          <ul className='list-disc pl-5 mt-1 text-green-600'>
            <li>Diploma Programs: Wednesday 24th July</li>
            <li>Degree Programs: Thursday 25th July</li>
            <li className='text-black'>Late Registration Friday 26th July</li>
          </ul>
        </AlertDescription>
      </Alert>
    </main>
  );
}
