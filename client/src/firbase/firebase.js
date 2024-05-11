import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyDBgHsrSEf-Fz__wLlmAP4mTjMOtn9UTFI",
  authDomain: "walmart-main.firebaseapp.com",
  projectId: "walmart-main",
  storageBucket: "walmart-main.appspot.com",
  messagingSenderId: "859669471224",
  appId: "1:859669471224:web:addbec376c6f4cf88a800d",
  measurementId: "G-CVBWB02WNS"
  };


// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const provider = auth.GoogleAuthProvider

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app, "gs://walmart-main.appspot.com");
// Initialize Firebase Authentication and get a reference to the service
