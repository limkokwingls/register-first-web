import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleCheckBig } from 'lucide-react';

export default function SuccessPage() {
  return (
    <main className='p-5 mt-5'>
      <Alert>
        <CircleCheckBig className='size-4' color='green' />
        <AlertTitle>Successful</AlertTitle>
        <AlertDescription>
          Please ensure you complete your registration in person at Limkokwing
          University on July 22.
        </AlertDescription>
      </Alert>
    </main>
  );
}
