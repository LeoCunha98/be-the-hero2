// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbsxnNr0kA9iryG1mjSQUYr6zvYyEL4k0",
  authDomain: "be-the-hero-55721.firebaseapp.com",
  projectId: "be-the-hero-55721",
  storageBucket: "be-the-hero-55721.appspot.com",
  messagingSenderId: "324293160823",
  appId: "1:324293160823:web:38a30609eefb9902d73b72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Initialize Database
const db = getDatabase(app);

export { auth, db };