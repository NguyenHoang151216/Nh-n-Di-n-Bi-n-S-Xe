// // // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import {getStorage } from 'firebase/storage';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY,
//     authDomain: "pet-adopt-b1b44.firebaseapp.com",
//     projectId: "pet-adopt-b1b44",
//     storageBucket: "pet-adopt-b1b44.firebasestorage.app",
//     messagingSenderId: "118136762227",
//     appId: "1:118136762227:web:1dd08256c623b00ea99f06",
//     measurementId: "G-5NPSLQ59KQ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app)
// export const storage = getStorage(app);
// // // const analytics = getAnalytics(app);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY,
  authDomain: "pet-adopt-135c1.firebaseapp.com",
  projectId: "pet-adopt-135c1",
  storageBucket: "pet-adopt-135c1.firebasestorage.app",
  messagingSenderId: "333201669531",
  appId: "1:333201669531:web:f8b9239da930ccb2b1353e",
  measurementId: "G-S29KP2G830"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const storage = getStorage(app);