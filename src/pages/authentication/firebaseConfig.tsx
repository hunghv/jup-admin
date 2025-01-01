import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC30-KJgvGKJD8pyxJALoiVu19IBPd7fKU',
  authDomain: 'fir-hunghv2.firebaseapp.com',
  projectId: 'fir-hunghv2',
  storageBucket: 'fir-hunghv2.appspot.com',
  messagingSenderId: '807921251969',
  appId: '1:807921251969:web:1cbb472a72363e58807f80',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
