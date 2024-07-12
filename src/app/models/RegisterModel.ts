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

export const Genders = ['Male', 'Female', 'Other'] as const;
export type Gender = (typeof Genders)[number];

export const MaritalStatuses = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
  'Other',
] as const;
export type MaritalStatus = (typeof MaritalStatuses)[number];

export default interface RegisterModel {
  reference: string;
  nationalId: string;
  names: string;
  email: string;
  confirmEmail: string;
  phone1: string;
  phone2?: string;
  religion: string;
  dateOfBirth: Date;
  gender: Gender;
  maritalStatus: MaritalStatus;
  birthPlace: string;
  homeTown: string;
  heighSchool: string; // Name of high school
  nextOfKin: {
    names: string;
    phone: string;
    relationship: Relationship;
  };
}
