import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCPYhXrYNwVouXMdR99LEDvJoe1ySx_9rA",
  authDomain: "scannerpro-1d5e3.firebaseapp.com",
  projectId: "scannerpro-1d5e3",
  storageBucket: "scannerpro-1d5e3.appspot.com",
  messagingSenderId: "289838800505",
  appId: "1:289838800505:web:1999a203f72cf72c727ea8",
  measurementId: "G-X376K05HTN"
};
const app=initializeApp(firebaseConfig);
export const db=getFirestore(app);
