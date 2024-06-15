import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore,  collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgPV3peaUVtY5ms8WULiL-BEzKGmkKZmQ",
  authDomain: "bdalgo-4bbad.firebaseapp.com",
  projectId: "bdalgo-4bbad",
  storageBucket: "bdalgo-4bbad.appspot.com",
  messagingSenderId: "114129226396",
  appId: "1:114129226396:web:34cba9ec7e6ca0166f7b59",
  measurementId: "G-H781W8S2Z1"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore  = getFirestore(app);
