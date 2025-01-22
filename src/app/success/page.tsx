import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleCheckBig } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SuccessPage() {
  return (
    <main className='p-5 mt-5 md:w-[40vw] mx-auto space-y-4'>
      <Alert className='bg-green-50'>
        <CircleCheckBig className='size-4' color='green' />
        <AlertTitle className='font-medium'>Registration Successful</AlertTitle>
        <AlertDescription className='text-black'>
          Your information has been successfully submitted. Please complete your registration in person at Limkokwing University.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Registration Requirements</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <h3 className='font-medium mb-2'>Required Documents</h3>
            <ul className='list-disc pl-5 space-y-1'>
              <li>Admission Letter</li>
              <li>National ID</li>
              <li>Payment Receipt (minimum M4,000.00 of M16,000.00)</li>
            </ul>
          </div>

          <div>
            <h3 className='font-medium mb-2'>Important Dates</h3>
            <div className='space-y-2'>
              <div>
                <p className='font-medium text-green-700'>Main Registration Days:</p>
                <ul className='list-disc pl-5'>
                  <li>January 23rd & 24th, 2024</li>
                </ul>
              </div>
              
              <div>
                <p className='font-medium text-amber-700'>Late Registration:</p>
                <ul className='list-disc pl-5'>
                  <li>Until February 7th, 2024</li>
                </ul>
              </div>

              <div className='pt-2'>
                <p className='font-medium text-blue-700'>Classes Start:</p>
                <p className='pl-5'>February 3rd, 2024</p>
              </div>
            </div>
          </div>

          <div className='bg-amber-50 p-3 rounded-md'>
            <p className='text-sm text-amber-800'>
              <strong>Note:</strong> Students are encouraged to register on the main registration days (January 23rd & 24th). 
              Late registration will be available until February 7th for those unable to attend the main registration days.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
