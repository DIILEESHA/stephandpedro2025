import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSubpxZLPDCofDoyVZZUOwNBmabDqpOIA",
  authDomain: "stephanie-16292.firebaseapp.com",
  projectId: "stephanie-16292",
  storageBucket: "stephanie-16292.firebasestorage.app",
  messagingSenderId: "450857842946",
  appId: "1:450857842946:web:1d6a69a5e1835065072a1b",
  measurementId: "G-FY2TTGSFRQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
