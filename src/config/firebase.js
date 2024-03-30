// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqOhucoaFEXhQkMbVySfgiK8lyucngj6s",
  authDomain: "contact-app-ee31c.firebaseapp.com",
  projectId: "contact-app-ee31c",
  storageBucket: "contact-app-ee31c.appspot.com",
  messagingSenderId: "943061750941",
  appId: "1:943061750941:web:d123d2741101cfd2feb074"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);