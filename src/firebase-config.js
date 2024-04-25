import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAjotXA0pSICswK2Q7KmEcWDpaVYEwqiU",
  authDomain: "card-project-d6fff.firebaseapp.com",
  projectId: "card-project-d6fff",
  storageBucket: "card-project-d6fff.appspot.com",
  messagingSenderId: "844114406886",
  appId: "1:844114406886:web:555b40849437c5047fba27",
  measurementId: "G-DDKH1PP0MM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { app, auth, db, storage, database };
