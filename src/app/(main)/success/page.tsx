import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheckBig, CalendarDays, Clock, School } from 'lucide-react';

export default function SuccessPage() {
  return (
    <main className='p-5 mt-5 md:w-[40vw] mx-auto space-y-6'>
      <Alert className='bg-green-50 border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow duration-300'>
        <div className='flex items-center space-x-3'>
          <CircleCheckBig className='size-6 text-green-600' />
          <div>
            <AlertTitle className='font-semibold text-green-800'>
              Registration Successful
            </AlertTitle>
            <AlertDescription className='text-green-700'>
              Your information has been successfully submitted. Please complete
              your registration in person at Limkokwing University.
            </AlertDescription>
          </div>
        </div>
      </Alert>

      <Card className='shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <CardHeader>
          <CardTitle className='text-xl font-bold text-gray-800'>
            Registration Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div>
            <h3 className='font-semibold text-gray-700 mb-3'>
              Required Documents
            </h3>
            <ul className='list-disc pl-6 space-y-1 text-gray-600'>
              <li>Admission Letter</li>
              <li>National ID</li>
              <li>Payment Receipt (minimum M4,000.00 of M16,000.00)</li>
            </ul>
          </div>

          <div>
            <h3 className='font-semibold text-gray-700 mb-3'>
              Important Dates
            </h3>
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <CalendarDays className='size-5 text-gray-600 flex-shrink-0' />
                <div>
                  <p className='font-medium text-gray-700 mt-0'>
                    Main Registration Days
                  </p>
                  <p className='text-gray-600'>January 23rd & 24th, 2024</p>
                </div>
              </div>

              <div className='flex items-start space-x-3'>
                <Clock className='size-5 text-gray-600 flex-shrink-0' />
                <div>
                  <p className='font-medium text-gray-700'>Late Registration</p>
                  <p className='text-gray-600'>Until February 7th, 2024</p>
                </div>
              </div>

              <div className='flex items-start space-x-3'>
                <School className='size-5 text-gray-600 flex-shrink-0' />
                <div>
                  <p className='font-medium text-gray-700'>Classes Start</p>
                  <p className='text-gray-600'>February 3rd, 2024</p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400'>
            <p className='text-sm text-amber-800'>
              <strong>Note:</strong> Students are encouraged to register on the
              main registration days (January 23rd & 24th). Late registration
              will be available until February 7th for those unable to attend
              the main registration days.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
