// bring in the firebase starter, login tools & the database tools
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// read the saved keys from the local file
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY, // the public app key
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN, // the login web address
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID, // the project name
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET, // the file bucket
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, // the sender id
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID, // this web app id
};

// start firebase once, even if this file is loaded again
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// share the login tool & the database tool with the rest of the app
export const auth = getAuth(app);
export const db = getFirestore(app);