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



createApp(App).directive('lazyimage', {
    mounted: (el) => {
        function loadImage() {
          
            const anime = el.children[0]
            const imageElement = el.children[1]
            // console.log(imageElement)
            if (imageElement) {
              imageElement.addEventListener("load", () => {
                anime.style.display = 'none';
              });
              imageElement.addEventListener("error", () => console.log("error"));
              imageElement.src = imageElement.dataset.url;
            } else{
                console.log('no img found')
            }
          }
      
          function handleIntersect(entries, observer) {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                loadImage();
                observer.unobserve(el);
              }
            });
          }
      
          function createObserver() {
            const options = {
              root: null,
              threshold: "1"
            };
            const observer = new IntersectionObserver(handleIntersect, options);
            observer.observe(el);
          }
          if (window["IntersectionObserver"]) {
            createObserver();
            
          } else {
            loadImage();
          }

    }
  }).use(store).use(router).mount('#app')


// .use(lazyPlugin, {
//     loading: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921',
//     error: 'error.png'
//   })