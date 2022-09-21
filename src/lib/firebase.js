import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'social-media-app-fdf4e.firebaseapp.com',
  projectId: 'social-media-app-fdf4e',
  storageBucket: 'process.env.REACT_APP_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: '113839358695',
  appId: '1:113839358695:web:9b1b337696b10db65e9842',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
// Auth Provider
export const provider = new GoogleAuthProvider();

// Initialize Cloud Storage
export const storage = getStorage(app);

// Initialize Realtime Database
export const db = getFirestore(app);

// Collections Refs
export const pinCollectionRef = collection(db, 'pins');
export const userscolectionRef = collection(db, 'users');

export default app;
