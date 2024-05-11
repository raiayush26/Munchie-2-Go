import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
import { getAuth } from "firebase/auth";


 const firebaseConfig = {
  apiKey: "AIzaSyBohaQ9gExSnEQAia5FFsiiq65LJ55oYss",
  authDomain: "walmart-d07f5.firebaseapp.com",
  projectId: "walmart-d07f5",
  storageBucket: "walmart-d07f5.appspot.com",
  messagingSenderId: "939135917636",
  appId: "1:939135917636:web:382893b82d37d257dd2611",
  measurementId: "G-778JRTJ1B8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
