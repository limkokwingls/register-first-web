'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type Programs = {
  [key: string]: string[];
};

const programs: Programs = {
  TVET: ['CBIT', 'CPA', 'CAT', 'CGD', 'CMK', 'CTM'],
};

export default function ReferenceNumberInput() {
  const [refParts, setRefParts] = useState<string[]>(['TVET', '', '']);
  const [isValid, setIsValid] = useState<boolean>(true);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
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

  const handleInputChange = (index: number, value: string): void => {
    const newRefParts = [...refParts];
    newRefParts[index] = value.toUpperCase();
    setRefParts(newRefParts);

    if (index === 1 && isValidProgram(value)) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleSubmit = (): void => {
    const valid = validateReference();
    setIsValid(valid);
    if (valid) {
      const referenceNumber = refParts.join('-').toLowerCase();
      router.push(`/form/${referenceNumber}`);
    }
  };

  useEffect(() => {
    inputRefs[1].current?.focus();
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
              letter. It follows this format: TVET/XXXX/XX
            </p>
            <p className='text-sm text-gray-500 mt-3'>
              For example: TVET/CBIT/1
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
            {[1, 2].map((index) => (
              <React.Fragment key={index}>
                <Input
                  ref={inputRefs[index]}
                  value={refParts[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className={cn('w-20 text-center', index === 2 && 'w-12')}
                  maxLength={index === 1 ? 4 : 3}
                  placeholder={index === 1 ? 'XXXX' : 'XX'}
                />
                {index < 2 && <span className='text-xl font-bold'>/</span>}
              </React.Fragment>
            ))}
          </div>

          {!isValid && (
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
        </div>
      </CardContent>
    </Card>
  );
}

function isValidProgram(value: string): boolean {
  return programs['TVET'].includes(value.toUpperCase());
}
