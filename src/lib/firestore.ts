// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCzK40p0cvE3mUV3AbEuxCXuxQxKV0o2-M',
  authDomain: 'luctregistration.firebaseapp.com',
  projectId: 'luctregistration',
  storageBucket: 'luctregistration.appspot.com',
  messagingSenderId: '361080184153',
  appId: '1:361080184153:web:e567afb9deb9ab74084048',
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
