import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjJs2RVdrTzMHV9J5B3BrDFfRlng7XuOY",
  authDomain: "reactlinkedin-ff90b.firebaseapp.com",
  projectId: "reactlinkedin-ff90b",
  storageBucket: "reactlinkedin-ff90b.firebasestorage.app",
  messagingSenderId: "739913319913",
  appId: "1:739913319913:web:81474456600ad58948b778",
  measurementId: "G-4LXTCGFGZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
