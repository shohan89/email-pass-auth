// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0WuMmQVcIvjaPXbu3jXbjlqUTqO2EihY",
  authDomain: "email-pass-auth-e9dc6.firebaseapp.com",
  projectId: "email-pass-auth-e9dc6",
  storageBucket: "email-pass-auth-e9dc6.firebasestorage.app",
  messagingSenderId: "926434798116",
  appId: "1:926434798116:web:f1138547d645b9fba046b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth as default };
