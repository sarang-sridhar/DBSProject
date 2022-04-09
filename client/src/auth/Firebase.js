// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA2-jgXMEXwxR9B0c-rh7U9Ps5zXMa9Np8',
  authDomain: 'auction-management-syste-d168a.firebaseapp.com',
  projectId: 'auction-management-syste-d168a',
  storageBucket: 'auction-management-syste-d168a.appspot.com',
  messagingSenderId: '928300959446',
  appId: '1:928300959446:web:12a6a364a1c3e7b2d32b77'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
