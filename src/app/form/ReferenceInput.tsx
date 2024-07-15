'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type FacultyPrograms = {
  [key: string]: string[];
};

const facultyPrograms: FacultyPrograms = {
  FABE: ['BAAS', 'DAT'],
  FBMG: ['BEN', 'BHR', 'BIB', 'DBM', 'DMK', 'DRM'],
  FCMB: ['BPC', 'DJM', 'DPR', 'BBJ', 'BDF', 'DBRTV', 'DFP'],
  FCTH: ['BTM', 'DEM', 'DHM', 'DITR', 'DTM'],
  FDI: ['BDSPD', 'DCAV', 'DGD', 'BAFASH', 'DFAD'],
  FICT: ['BSCBIT', 'BSCIT', 'BSCSM', 'DBIT', 'DIT', 'DMSE'],
};

const ReferenceNumberInput = () => {
  const [refParts, setRefParts] = useState<string[]>(['LUCT', '', '', '', '']);
  const [isValid, setIsValid] = useState<boolean>(true);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const router = useRouter();

  const validateReference = (): boolean => {
    const [, faculty, program, admissionCode, number] = refParts;

    if (!Object.keys(facultyPrograms).includes(faculty.toUpperCase())) {
      return false;
    }
    if (!facultyPrograms[faculty].includes(program.toUpperCase())) {
      return false;
    }
    if (['A', 'W', 'P'].indexOf(admissionCode.toUpperCase()) === -1) {
      return false;
    }
    if (!/^[0-9P]+$/.test(number)) {
      return false;
    }
    return true;
  };

  const handleInputChange = (index: number, value: string): void => {
    const newRefParts = [...refParts];
    if (index === 3) {
      newRefParts[index] = value.replace(/[^awp]/gi, '').toUpperCase();
    }
    if (index === 4) {
      newRefParts[index] = value.replace(/[^p0-9]/gi, '').toUpperCase();
    } else {
      newRefParts[index] = value.toUpperCase();
    }
    setRefParts(newRefParts);

    if (value.length > 0 && index === 3) {
      inputRefs[index + 1].current?.focus();
    }
    if (value.length === 5 && index < 4) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleSubmit = (): void => {
    const valid = validateReference();
    setIsValid(valid);
    if (valid) {
      const referenceNumber = refParts.join('-').toLowerCase();
      console.log('Reference Number:', referenceNumber);
      // router.push(`/form/${referenceNumber}`);
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
              letter. It follows this format: LUCT/XXXX/XXXX/X/XX
            </p>
            <p className='text-sm text-gray-500 mt-3'>
              For example: LUCT/FICT/BSCSM/<span className='font-bold'>P</span>
              /32
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
            {[1, 2, 3, 4].map((index, arrayIndex) => (
              <React.Fragment key={index}>
                <Input
                  ref={inputRefs[index]}
                  value={refParts[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className={cn(
                    'w-12 sm:w-20 text-center p-0',
                    index === 3 && 'w-8 sm:w-12',
                    index === 4 && 'w-8 sm:w-12'
                  )}
                  maxLength={index === 3 ? 1 : 6}
                  placeholder={index === 3 ? 'X' : 'XXX'}
                />
                {arrayIndex < 3 && <span className='text-xl font-bold'>/</span>}
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
};

export default ReferenceNumberInput;
