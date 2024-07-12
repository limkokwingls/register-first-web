'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type FacultyPrograms = {
  [key: string]: string[];
};

const facultyPrograms: FacultyPrograms = {
  FICT: ['BSCSM', 'DIT'],
  FDI: ['BBS', 'DFMG'],
};

const ReferenceNumberInput = () => {
  const [refParts, setRefParts] = useState<string[]>(['LUCT', '', '', '']);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const router = useRouter();

  const validateReference = (): boolean => {
    const [, faculty, program, lastPart] = refParts;
    const lastPartRegex = /^[awp0-9]{1,5}$/i;

    if (!Object.keys(facultyPrograms).includes(faculty)) {
      setError('Invalid faculty code. Please check and try again.');
      setIsValid(false);
      return false;
    }

    if (!facultyPrograms[faculty].includes(program)) {
      setError(
        'Invalid program code for the selected faculty. Please check and try again.'
      );
      setIsValid(false);
      return false;
    }

    if (!lastPartRegex.test(lastPart)) {
      setError(
        'The last part should contain only A, W, P, and/or numbers 0-9, between 1 and 5 characters.'
      );
      setIsValid(false);
      return false;
    }

    setIsValid(true);
    setError('');
    return true;
  };

  const handleInputChange = (index: number, value: string): void => {
    const newRefParts = [...refParts];
    if (index === 3) {
      // For the last part, only allow a, w, p, and numbers 0-9
      newRefParts[index] = value.replace(/[^awp0-9]/gi, '').toUpperCase();
    } else {
      newRefParts[index] = value.toUpperCase();
    }
    setRefParts(newRefParts);

    // Move to next input if current is filled with 5 characters
    if (value.length === 5 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Clear any previous error messages
    setError('');
    setIsValid(false);
  };

  const handleSubmit = (): void => {
    if (validateReference()) {
      const referenceNumber = refParts.join('-').toLowerCase();
      router.push(`/form/${referenceNumber}`);
    }
  };

  useEffect(() => {
    inputRefs[1].current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className='w-full max-w-[600px] mx-auto mb-6'>
      <CardHeader>
        <CardTitle className='text-base font-normal'>
          Reference Number
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className='mb-4'>
          <AlertDescription>
            <p>
              Your reference number is located at the top of your admission
              letter. It follows this format: LUCT/XXXX/XXXX/XXX
            </p>
            <p className='text-sm text-gray-500 mt-3'>
              For example: LUCT/FICT/BSCSM/P32
            </p>
          </AlertDescription>
        </Alert>

        <div className='space-y-4'>
          <Label htmlFor='refNumber'>Enter Your Reference Number</Label>
          <div className='flex items-center space-x-1'>
            <Input
              value={refParts[0]}
              readOnly
              className='w-16 text-center bg-gray-100'
            />
            <span className='text-xl font-bold'>/</span>
            {[1, 2, 3].map((index, arrayIndex) => (
              <React.Fragment key={index}>
                <Input
                  ref={inputRefs[index]}
                  value={refParts[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className='w-14 sm:w-20 text-center p-0'
                  maxLength={5}
                  placeholder='XXXX'
                />
                {arrayIndex < 2 && <span className='text-xl font-bold'>/</span>}
              </React.Fragment>
            ))}
          </div>

          {error && (
            <div className='text-red-600 text-sm mt-2'>
              Invalid Reference Number
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className='w-full mt-4'
            disabled={refParts.some((part) => part.length === 0)}
          >
            Submit
          </Button>

          {isValid && (
            <div className='text-green-600 text-sm mt-2'>
              Valid reference number: {refParts.join('/')}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferenceNumberInput;
