import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdayY4Fno6ueV8JDp0khoSi4lU1PRx29s",
  authDomain: "formo-f8d62.firebaseapp.com",
  projectId: "formo-f8d62",
  storageBucket: "formo-f8d62.appspot.com",
  messagingSenderId: "693864597172",
  appId: "1:693864597172:web:66db7eea9730248e9ff9e1",
  measurementId: "G-3QWKWC3GNB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, onAuthStateChanged, signOut };