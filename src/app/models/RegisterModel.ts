export const Religions = ['Christian', 'Muslim', 'Hindu', 'Buddhist', 'Other'];
export type Religion = (typeof Religions)[number];

export const Relationships = [
  'Father',
  'Mother',
  'Brother',
  'Sister',
  'Spouse',
  'Child',
  'Other',
];
export type Relationship = (typeof Relationships)[number];

export default interface RegisterModel {
  nationalId: string;
  names: string;
  email: string;
  confirmEmail: string;
  phone1: string;
  phone2?: string;
  religion: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Other';
  birthPlace: string;
  homeTown: string;
  heighSchool: string; // Name of high school
  nextOfKin: {
    names: string;
    phone: string;
    relationship: Relationship;
  };
}
