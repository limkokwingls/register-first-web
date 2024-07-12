import { addDoc, collection } from 'firebase/firestore';
import RegisterModel from '../models/RegisterModel';
import { db } from '@/lib/firestore';
import { getProgramByCode } from '../models/programs';

export async function saveRegister(reference: string, data: RegisterModel) {
  const programCode = reference.split('-')[2].toUpperCase();
  const program = getProgramByCode(programCode);
  if (!program) {
    throw new Error('Invalid program code');
  }
  const firestoreData: RegisterModel = {
    ...data,
    reference,
    program: program,
    dateOfBirth: new Date(data.dateOfBirth),
  };
  await addDoc(collection(db, 'registrations'), firestoreData);
}
