import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfzIvFFVfRc1UYs1YQfuK67zAKpwERXU8",
  authDomain: "finacialtracker-b0c30.firebaseapp.com",
  databaseURL: "https://finacialtracker-b0c30-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finacialtracker-b0c30",
  storageBucket: "finacialtracker-b0c30.firebasestorage.app",
  messagingSenderId: "1018199894826",
  appId: "1:1018199894826:web:3338ccead737eeff9a0c53",
  measurementId: "G-LDCZMKLVJ4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;