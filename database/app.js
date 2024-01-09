// Import the functions you need from the SDKs you need
import { initializeApp,getApp  } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
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
const app = initializeApp(firebaseConfig);
const authApp = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db  = getFirestore(app);

export { app, authApp, db };