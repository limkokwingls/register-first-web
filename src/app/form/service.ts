import { addDoc, collection } from 'firebase/firestore';
import RegisterModel from '../models/RegisterModel';
import { db } from '@/lib/firestore';

export async function saveRegister(data: RegisterModel) {
  console.log(data);
  // const firestoreData = {
  //   ...data,
  //   dateOfBirth: new Date(data.dateOfBirth),
  // };
  // await addDoc(collection(db, 'registrations'), firestoreData);
}
