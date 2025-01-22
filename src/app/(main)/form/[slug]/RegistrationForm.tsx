'use client';

import { Button } from '@/components/ui/button';
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
import {
  genders,
  maritalStatuses,
  nextOfKinRelationships,
  religions,
  students,
} from '@/db/schema';
import { createStudent } from '@/server/students/actions';
import { IconReload } from '@tabler/icons-react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type Student = typeof students.$inferSelect & {
  confirmEmail: string;
};

type Props = {
  reference: string;
  nationalId: string;
  obj?: typeof students.$inferSelect;
};

export default function RegistrationForm({
  reference,
  nationalId,
  obj,
}: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Student>({
    defaultValues: obj || {
      nationalId,
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<Student> = async (data) => {
    await createStudent({ ...data, reference });
    router.replace('/success');
  };

  return (
    <Card className='w-full max-w-[800px] mx-auto'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-lg sm:text-xl'>Registration Form</CardTitle>
        <Button variant='secondary' onClick={() => router.back()}>
          <ArrowLeft className='h-4 w-4 mr-2' />
          Back
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='nationalId'>National ID</Label>
              <Input
                id='nationalId'
                readOnly
                {...register('nationalId', {
                  required: 'National ID is required',
                })}
              />
              {errors.nationalId && (
                <p className='text-red-500 text-sm'>
                  {errors.nationalId.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='names'>Full Names</Label>
              <Input
                id='names'
                {...register('name', { required: 'Full name is required' })}
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirmEmail'>Confirm Email</Label>
              <Input
                id='confirmEmail'
                type='email'
                {...register('confirmEmail', {
                  required: 'Please confirm your email',
                  validate: (value, formValues) =>
                    value === formValues.email || 'Emails do not match',
                })}
              />
              {errors.confirmEmail && (
                <p className='text-red-500 text-sm'>
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone1'>Phone 1</Label>
              <Input
                id='phone1'
                {...register('phone1', {
                  required: 'Primary phone number is required',
                })}
              />
              {errors.phone1 && (
                <p className='text-red-500 text-sm'>{errors.phone1.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone2'>Phone 2 (Optional)</Label>
              <Input id='phone2' {...register('phone2')} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='religion'>Religion</Label>
              <Controller
                name='religion'
                control={control}
                rules={{ required: 'Religion is required' }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select religion' />
                    </SelectTrigger>
                    <SelectContent>
                      {religions.map((religion) => (
                        <SelectItem key={religion} value={religion}>
                          {religion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.religion && (
                <p className='text-red-500 text-sm'>
                  {errors.religion.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='dateOfBirth'>Date of Birth</Label>
              <Input
                id='dateOfBirth'
                type='date'
                {...register('dateOfBirth', {
                  required: 'Date of birth is required',
                  valueAsDate: true,
                })}
              />
              {errors.dateOfBirth && (
                <p className='text-red-500 text-sm'>
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='gender'>Gender</Label>
              <Controller
                name='gender'
                control={control}
                rules={{ required: 'Gender is required' }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select gender' />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className='text-red-500 text-sm'>{errors.gender.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='maritalStatus'>Marital Status</Label>
              <Controller
                name='maritalStatus'
                control={control}
                rules={{ required: 'Marital status is required' }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select marital status' />
                    </SelectTrigger>
                    <SelectContent>
                      {maritalStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.maritalStatus && (
                <p className='text-red-500 text-sm'>
                  {errors.maritalStatus.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='birthPlace'>Birth Place</Label>
              <Input
                id='birthPlace'
                {...register('birthPlace', {
                  required: 'Birth place is required',
                })}
              />
              {errors.birthPlace && (
                <p className='text-red-500 text-sm'>
                  {errors.birthPlace.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='homeTown'>Home Town</Label>
              <Input
                id='homeTown'
                {...register('homeTown', { required: 'Home town is required' })}
              />
              {errors.homeTown && (
                <p className='text-red-500 text-sm'>
                  {errors.homeTown.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='highSchool'>High School</Label>
              <Input
                id='highSchool'
                {...register('highSchool', {
                  required: 'High school is required',
                })}
              />
              {errors.highSchool && (
                <p className='text-red-500 text-sm'>
                  {errors.highSchool.message}
                </p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>Next of Kin</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='nextOfKinNames'>Names</Label>
                <Input
                  id='nextOfKinNames'
                  {...register('nextOfKinName', {
                    required: 'Next of kin name is required',
                  })}
                />
                {errors.nextOfKinName && (
                  <p className='text-red-500 text-sm'>
                    {errors.nextOfKinName.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='nextOfKinPhone'>Phone</Label>
                <Input
                  id='nextOfKinPhone'
                  {...register('nextOfKinPhone', {
                    required: 'Next of kin phone is required',
                  })}
                />
                {errors.nextOfKinPhone && (
                  <p className='text-red-500 text-sm'>
                    {errors.nextOfKinPhone.message}
                  </p>
                )}
              </div>

              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='nextOfKinRelationship'>Relationship</Label>
                <Controller
                  name='nextOfKinRelationship'
                  control={control}
                  rules={{ required: 'Relationship is required' }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select relationship' />
                      </SelectTrigger>
                      <SelectContent>
                        {nextOfKinRelationships.map((relationship) => (
                          <SelectItem key={relationship} value={relationship}>
                            {relationship}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.nextOfKinRelationship && (
                  <p className='text-red-500 text-sm'>
                    {errors.nextOfKinRelationship.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting && (
              <IconReload className='mr-2 h-4 w-4 animate-spin' />
            )}
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
