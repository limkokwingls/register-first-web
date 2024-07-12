'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const Religions = [
  'Christian',
  'Muslim',
  'Hindu',
  'Buddhist',
  'Other',
] as const;
type Religion = (typeof Religions)[number];

const Relationships = [
  'Father',
  'Mother',
  'Brother',
  'Sister',
  'Spouse',
  'Child',
  'Other',
] as const;
type Relationship = (typeof Relationships)[number];

interface RegisterModel {
  nationalId: string;
  names: string;
  email: string;
  confirmEmail: string;
  phone1: string;
  phone2?: string;
  religion: Religion;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Other';
  birthPlace: string;
  homeTown: string;
  heighSchool: string;
  nextOfKin: {
    names: string;
    phone: string;
    relationship: Relationship;
  };
}

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterModel>();

  const onSubmit: SubmitHandler<RegisterModel> = (data) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  return (
    <Card className='w-full max-w-[800px] mx-auto'>
      <CardHeader>
        <CardTitle>Registration Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='nationalId'>National ID</Label>
              <Input
                id='nationalId'
                {...register('nationalId', { required: true })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='names'>Names</Label>
              <Input id='names' {...register('names', { required: true })} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                {...register('email', { required: true })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='confirmEmail'>Confirm Email</Label>
              <Input
                id='confirmEmail'
                type='email'
                {...register('confirmEmail', { required: true })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone1'>Phone 1</Label>
              <Input id='phone1' {...register('phone1', { required: true })} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone2'>Phone 2</Label>
              <Input id='phone2' {...register('phone2')} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='religion'>Religion</Label>
              <Select
                onValueChange={(value: Religion) =>
                  register('religion').onChange({ target: { value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select religion' />
                </SelectTrigger>
                <SelectContent>
                  {Religions.map((religion) => (
                    <SelectItem key={religion} value={religion}>
                      {religion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='dateOfBirth'>Date of Birth</Label>
              <Input
                id='dateOfBirth'
                type='date'
                {...register('dateOfBirth', {
                  required: true,
                  valueAsDate: true,
                })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='gender'>Gender</Label>
              <Select
                onValueChange={(value: RegisterModel['gender']) =>
                  register('gender').onChange({ target: { value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select gender' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Male'>Male</SelectItem>
                  <SelectItem value='Female'>Female</SelectItem>
                  <SelectItem value='Other'>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='maritalStatus'>Marital Status</Label>
              <Select
                onValueChange={(value: RegisterModel['maritalStatus']) =>
                  register('maritalStatus').onChange({ target: { value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select marital status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Single'>Single</SelectItem>
                  <SelectItem value='Married'>Married</SelectItem>
                  <SelectItem value='Divorced'>Divorced</SelectItem>
                  <SelectItem value='Widowed'>Widowed</SelectItem>
                  <SelectItem value='Other'>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='birthPlace'>Birth Place</Label>
              <Input
                id='birthPlace'
                {...register('birthPlace', { required: true })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='homeTown'>Home Town</Label>
              <Input
                id='homeTown'
                {...register('homeTown', { required: true })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='heighSchool'>High School</Label>
              <Input
                id='heighSchool'
                {...register('heighSchool', { required: true })}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>Next of Kin</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='nextOfKinNames'>Names</Label>
                <Input
                  id='nextOfKinNames'
                  {...register('nextOfKin.names', { required: true })}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='nextOfKinPhone'>Phone</Label>
                <Input
                  id='nextOfKinPhone'
                  {...register('nextOfKin.phone', { required: true })}
                />
              </div>
              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='nextOfKinRelationship'>Relationship</Label>
                <Select
                  onValueChange={(value: Relationship) =>
                    register('nextOfKin.relationship').onChange({
                      target: { value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select relationship' />
                  </SelectTrigger>
                  <SelectContent>
                    {Relationships.map((relationship) => (
                      <SelectItem key={relationship} value={relationship}>
                        {relationship}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
