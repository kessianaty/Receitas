import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAk4x3wj2ALcUtMEyL1yhopI1PvPvanPU",
  authDomain: "sorvetinho-746dd.firebaseapp.com",
  projectId: "sorvetinho-746dd",
  storageBucket: "sorvetinho-746dd.appspot.com",
  messagingSenderId: "835914773849",
  appId: "1:835914773849:web:1dc98f1aaf878e544f0848",
  measurementId: "G-0LSMVSX3CS"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const sorvetinho = getFirestore(app);