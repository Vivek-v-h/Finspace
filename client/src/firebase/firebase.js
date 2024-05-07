
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "finspace-a3eb0.firebaseapp.com",
  projectId: "finspace-a3eb0",
  storageBucket: "finspace-a3eb0.appspot.com",
  messagingSenderId: "654547088771",
  appId: "1:654547088771:web:a0d40a7155f5f05522b2b6"
};


export const app = initializeApp(firebaseConfig);