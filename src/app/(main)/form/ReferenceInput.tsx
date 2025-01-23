'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { getStudentByNationalId } from '@/server/students/actions';

type Programs = {
  [key: string]: string[];
};

const programs: Programs = {
  TVET: ['CBIT', 'CPA', 'CAT', 'CGD', 'CMK', 'CTM'],
};

export default function ReferenceNumberInput() {
  const [refParts, setRefParts] = useState<string[]>(['TVET', '', '']);
  const [nationalId, setNationalId] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const nationalIdRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const validateReference = (): boolean => {
    const [prefix, program, number] = refParts;

    if (prefix !== 'TVET') {
      return false;
    }

    if (!programs['TVET'].includes(program.toUpperCase())) {
      return false;
    }

    if (!/^\d+$/.test(number)) {
      return false;
    }

    return true;
  };

  const validateNationalId = (id: string): boolean => {
    return id.length >= 10 && /^\d+$/.test(id) && id.length <= 13;
  };

  const handleInputChange = (index: number, value: string): void => {
    const newRefParts = [...refParts];
    newRefParts[index] = value.toUpperCase();
    setRefParts(newRefParts);

    if (index === 1 && isValidProgram(value)) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleNationalIdChange = (value: string): void => {
    setNationalId(value);
  };

  const handleSubmit = (): void => {
    const refValid = validateReference();
    const idValid = validateNationalId(nationalId);
    const valid = refValid && idValid;
    setIsValid(valid);

    if (valid) {
      startTransition(async () => {
        const existingStudent = await getStudentByNationalId(nationalId);
        const referenceNumber =
          existingStudent?.reference || refParts.join('-').toLowerCase();
        router.push(`/form/${nationalId}?ref=${referenceNumber}`);
      });
    }
  };

  useEffect(() => {
    inputRefs[1].current?.focus();
  }, []);

  return (
    <Card className='w-full max-w-[600px] mx-auto mb-6'>
      <CardHeader>
        <CardTitle className='text-base font-normal'>
          Student Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className='mb-4'>
          <AlertDescription>
            <p>
              Your reference number is located at the top of your admission
              letter. It follows this format: TVET/XXXX/XX
            </p>
            <p className='text-sm text-gray-500 mt-3'>
              For example: TVET/CBIT/1
            </p>
          </AlertDescription>
        </Alert>

        <div className='space-y-4'>
          <div>
            <Label htmlFor='nationalId'>National ID Number</Label>
            <Input
              ref={nationalIdRef}
              id='nationalId'
              value={nationalId}
              onChange={(e) => handleNationalIdChange(e.target.value)}
              className={cn(
                !isValid && !validateNationalId(nationalId) && 'border-red-500'
              )}
              placeholder='Enter your National ID number'
              disabled={isPending}
            />
          </div>

          <div>
            <Label htmlFor='refNumber'>Reference Number</Label>
            <div className='flex items-center space-x-1'>
              <Input
                value={refParts[0]}
                readOnly
                className='w-16 text-center bg-gray-100'
              />
              <span className='text-xl font-bold'>/</span>
              {[1, 2].map((index) => (
                <React.Fragment key={index}>
                  <Input
                    ref={inputRefs[index]}
                    value={refParts[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder='XXXX'
                    className={cn(
                      'text-center w-20',
                      !isValid && 'border-red-500'
                    )}
                    disabled={isPending}
                  />
                  {index === 1 && <span className='text-xl font-bold'>/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className='w-full'
            disabled={
              !validateReference() ||
              !validateNationalId(nationalId) ||
              isPending
            }
          >
            {isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            ) : (
              'Continue'
            )}
          </Button>

          {!isValid && (
            <p className='text-sm text-red-500'>
              Please enter a valid reference number and national ID
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function isValidProgram(value: string): boolean {
  return programs['TVET'].includes(value.toUpperCase());
}
