import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyA9g5tRGXRuluY226CASiyDdZv05scre8I",
  authDomain: "testandroidpro-179da.firebaseapp.com",
  projectId: "testandroidpro-179da",
  storageBucket: "testandroidpro-179da.appspot.com",
  messagingSenderId: "39860544479",
  appId: "1:39860544479:web:2099bdb5b6c4b0f3c41a6a",
  measurementId: "G-TV798QDM2N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence: ", error);
  });
