import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  limit,
  updateDoc,
} from 'firebase/firestore';
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
  if (data.id) {
    await updateDoc(doc(db, 'registrations', data.id), {
      ...firestoreData,
    });
  } else {
    await addDoc(collection(db, 'registrations'), firestoreData);
  }
}

export async function getRegistration(reference: string) {
  const q = query(
    collection(db, 'registrations'),
    where('reference', '==', reference),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }
  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() } as RegisterModel;
}
