<template>
        <div class="gridSection">
            <div v-lazyimage :class="`images ${image.class}`"
              v-for="image in images"
              :key="image.class"
            >
                <Kejianime class="anime"/>
                <img :data-url="image.imgUrl" alt="">
                <button>{{image.button}}</button>
            </div>
        </div>
      
      
</template>

<script>
import { ref } from '@vue/reactivity'
import Kejianime from '../components/Kejianime.vue'


export default {
  props: [ "images"],
  components: { Kejianime },
  setup() {
    
    return {  }
  },
  directives: {
    lazyimage: {
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
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

      .gridSection{
        display: grid;
        justify-content: center;
        height: 800px;
        grid-template-columns: 23% 23% 23% 23%;
        grid-template-rows: 24% 24% 24% 24%;
        gap: 10px;
        margin: 20px;

        div{
            height: 100%;
            position: relative;

            .anime{
              position: absolute;
              left: 0;
              top: 0;
            }
            
            img{
              width: 100%;
              height: 100%;
              object-fit: cover;
              position: absolute;
              left: 0;
              top: 0;

              &:hover img{
                  transform: scale(1.3);
              }
            }

            &.one{
              grid-column-start: 1;
              grid-column-end: 5;
              grid-row-start: 1;
              grid-row-end: 3;
            }
            &.two{
              grid-column-start: 1;
              grid-column-end: 3;
            }
            &.three{
              grid-column-start: 1;
              grid-column-end: 3;
            }
            &.four{
              grid-column-start: 3;
              grid-column-end: 5;
              grid-row-start: 3;
              grid-row-end: 5;
            }

            button{
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              bottom: 20px;
              background: white;
              width: 120px;
              border: none;
              padding: 10px 0;
              text-align: center;
              font-size: 1rem;
              font-weight: 600;
              box-shadow: 2px 2px 2px $lightShadow;
            }
        }

      }
    
    /*for the responsieve screen of md and above*/
    @media screen and (min-width:500px){
      .gridSection{
        height: 1000px;
      }
    }

      /*for the responsieve screen of md and above*/
    @media screen and (min-width:700px){
        .gridSection{
            height: 500px;
            grid-template-rows: 49% 49%;

            div{
              &.one{
                grid-column-start: 1;
                grid-column-end: 3;
                grid-row-start: 1;
                grid-row-end: 3;
              }
              &.two{
                grid-column-start: 3;
                grid-column-end: 4;
                grid-row-start: 1;
                grid-row-end: 2;
              }
              &.three{
                grid-column-start: 3;
                grid-column-end: 4;
                grid-row-start: 2;
                grid-row-end: 3;
              }
              &.four{
                grid-column-start: 4;
                grid-column-end: 5;
                grid-row-start: 1;
                grid-row-end: 3;
              }
            }
        }
    }
    
    
</style>