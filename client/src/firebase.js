// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd5Y9TiLYwGg2aWMuGeOYUGWu_D1R3EJ8",
  authDomain: "lc-practice-d86e4.firebaseapp.com",
  projectId: "lc-practice-d86e4",
  storageBucket: "lc-practice-d86e4.firebasestorage.app",
  messagingSenderId: "305122404920",
  appId: "1:305122404920:web:c2fdb158de55f546cb14cd",
  measurementId: "G-3SRLPPRSX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export const app = initializeApp(firebaseConfig);
export {app} ;