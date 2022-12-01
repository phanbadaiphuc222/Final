import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.vue';
import router from './router';
import firebase from 'firebase';

// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyAVH9U4ZLLok5aZWdo8101S47xGePl23A0",
    authDomain: "projectweb-90d2e.firebaseapp.com",
    projectId: "projectweb-90d2e",
    storageBucket: "projectweb-90d2e.appspot.com",
    messagingSenderId: "568262347939",
    appId: "1:568262347939:web:d536e33cab9ba6493ec316",
    measurementId: "G-71M02R3JZS"
};

firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
