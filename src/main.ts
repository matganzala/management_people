import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD56RpNHRI8Hv8JFC2CdYLsEC2--zwxa_U",
    authDomain: "desafio-pruvo-front.firebaseapp.com",
    projectId: "desafio-pruvo-front",
    storageBucket: "desafio-pruvo-front.appspot.com",
    messagingSenderId: "960538914255",
    appId: "1:960538914255:web:78409bf9bcb9739e97b6ba",
    measurementId: "G-G0K6SXKHP1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createApp(App).use(router).mount('#app')
