'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { students } from '@/db/schema';
import { useState } from 'react';
import { getProgramByReference } from '../../models/programs';
import RegistrationForm from './RegistrationForm';

type Props = {
  reference: string;
  nationalId: string;
  obj?: typeof students.$inferSelect;
};

export default function StudentPicker({ reference, nationalId, obj }: Props) {
  const [agree, setAgree] = useState<'yes' | 'no'>();
  const program = getProgramByReference(reference);

  if (agree === 'yes') {
    return (
      <RegistrationForm
        reference={reference}
        nationalId={nationalId}
        obj={obj}
      />
    );
  }
  if (agree === 'no') {
    return <RegistrationForm reference={reference} nationalId={nationalId} />;
  }

  return (
    <div className='px-2 w-full md:w-[50vw] mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>Already Registered?</CardTitle>
          <CardDescription>
            It seems like you have already registered. Did you previously
            register with the following details?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <p>{obj?.name}</p>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='nationalId'>National ID</Label>
                <p>{nationalId}</p>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='course'>Course</Label>
                <p>{program?.name}</p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-end gap-4 sm:gap-10 mt-5'>
          <Button variant='destructive' onClick={() => setAgree('no')}>
            <span className='hidden sm:block'>No, This is Not Me</span>
            <span className='block sm:hidden'>No</span>
          </Button>
          <Button onClick={() => setAgree('yes')}>
            <span className='hidden sm:block'>Yes, This is Me</span>
            <span className='block sm:hidden'>Yes</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
