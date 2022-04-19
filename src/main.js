import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/main.css"


import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCY4z_7R7CW3HrkvdSWfcYFRmoc0DRloaM",
    authDomain: "keji-styling-f71be.firebaseapp.com",
    projectId: "keji-styling-f71be",
    storageBucket: "keji-styling-f71be.appspot.com",
    messagingSenderId: "406907693302",
    appId: "1:406907693302:web:65fe054d5bff8faaa7a4d7",
    measurementId: "G-QFC8PMP38N"
};

// Initialize Firebase
initializeApp(firebaseConfig);



createApp(App).use(store).use(router).mount('#app')


// .use(lazyPlugin, {
//     loading: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921',
//     error: 'error.png'
//   })