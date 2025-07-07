//src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcSJyGa-NadzcvsiSUpS7etZ8oGYUOYm4",
  authDomain: "zenn-app-6c65a.firebaseapp.com",
  projectId: "zenn-app-6c65a",
  storageBucket: "zenn-app-6c65a.firebasestorage.app",
  messagingSenderId: "610848304545",
  appId: "1:610848304545:web:b10714c503107a43b5efe0",
  measurementId: "G-FNVZ3HT2BC",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);