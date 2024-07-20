'use client';
import StudentInfo from '@/app/models/StudentInfo';
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
import { useState } from 'react';
import RegistrationForm from './RegistrationForm';

type Props = {
  reference: string;
  obj?: StudentInfo;
};

export default function StudentPicker({ reference, obj }: Props) {
  const [agree, setAgree] = useState<'yes' | 'no'>();

  if (agree === 'yes') {
    return <RegistrationForm reference={reference} obj={obj} />;
  }
  if (agree === 'no') {
    return <RegistrationForm reference={reference} />;
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
                <p>{obj?.names}</p>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Course</Label>
                <p>{obj?.program.name}</p>
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
