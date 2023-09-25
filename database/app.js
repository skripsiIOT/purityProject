// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyGQ7UiGA8YG7nkHlUB3uBXxvftp4LWks",
  authDomain: "skripsiyay-f95b9.firebaseapp.com",
  projectId: "skripsiyay-f95b9",
  storageBucket: "skripsiyay-f95b9.appspot.com",
  messagingSenderId: "394905520865",
  appId: "1:394905520865:web:b0f1adce526815661545a0",
  measurementId: "G-FXG170QX13"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authApp = getAuth(app);