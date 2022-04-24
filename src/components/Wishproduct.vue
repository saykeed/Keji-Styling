<template>
  <div class="product">
      <div v-lazyproduct  class="imgBox">
          <Kejianime class="anime"/>
          <router-link :to="`/details/${product.id}`">
              <img :data-url="product.imgUrl" alt="">
          </router-link>
          <div class="cart">
            <i class="material-icons" @click="addToCart(product.id)">shopping_cart</i>
        </div>
      </div>
      <div class="otherInfo">
          <p class="title">{{product.title}}</p>
          <p class="price">NGN {{ product.price }}</p>
      </div>
      <i class="material-icons delete" @click="deleteFromLS(product.id)"> delete </i>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import Kejianime from './Kejianime.vue'
import {useStore} from 'vuex'

export default {
    components: { Kejianime },
    props: ['product'],
    directives: {
        lazyproduct: {
            mounted: (el) => {
                function loadImage() {
                    const anime = el.children[0]
                    const imageElement = el.children[1].children[0]
                    //console.log(imageElement)
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
    },
    setup(props, { emit }) {
        // variables
        const fav = ref(false);
        const store = useStore()
        

      // functions
        // function that deletes from local storage
        const deleteFromLS =  (id) => {
            let favs = JSON.parse(localStorage.getItem('favorites'))
            localStorage.setItem('favorites', JSON.stringify(favs.filter(favId => favId !== id)));
            emit('productRemoved', [id])
            store.dispatch('getFavAmount')
        }
        

        // functions that handles adding product to cart
        const addToCart = (id) => {
            if (!localStorage.getItem('cart')) {
                localStorage.setItem('cart', '[]')
            }
            let carted = JSON.parse(localStorage.getItem('cart'))
            if (!carted.includes(id)) {
                let oldData = JSON.parse(localStorage.getItem('cart'))
                oldData.push(id)

                localStorage.setItem('cart', JSON.stringify(oldData))
                store.dispatch('getCartAmount')
            } else {
                alert('Product has been added to cart')
            }
        }

        
        return { deleteFromLS, addToCart }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    .product{
        width: 47%;
        height: 250px;
        position: relative;
        margin: 10px 0;

        .imgBox{
            width: 100%;
            height: calc(100% - 60px);
            position: relative;

            div.cart{
                width: 40px;
                height: 40px;
                border-radius: 40px;
                background: white;
                box-shadow: 2px 2px 2px $lightShadow;
                position: absolute;
                bottom: 5%;
                right: 5%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;

                &:hover{
                    background: black;
                    color: white;
                }
            }
        }
        .anime{
            position: absolute;
            left: 0;
            top: 0;
        }

        a{
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;

            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                
            }
        }

        .otherInfo{
            text-align: left;
            margin: 10px auto;
            height: 60px;

            p{
                margin: 5px auto;
            }

            p.title{
                color: rgba(0, 0, 0, 0.812);
                font-size: 1rem;
            }

            p.price{
                color: $fadeBlack;
            }
        }

        i.delete{
            position: absolute;
            top: 5%;
            left: 5%;
            cursor: pointer;

            &:active{
                animation: shakeVertical 1s  linear;
            }

            &:hover{
                animation: shakeVertical 1s  linear;
            }

            @keyframes shakeVertical {
                0%, 100% {
                    -webkit-transform: translateY(0);
                            transform: translateY(0);
                }
                10%, 30%, 50%, 70% {
                    -webkit-transform: translateY(-4px);
                    transform: translateY(-4px);
                }
                20%, 40%, 60% {
                    -webkit-transform: translateY(4px);
                    transform: translateY(4px);
                }
                80% {
                    -webkit-transform: translateY(4px);
                    transform: translateY(4px);
                }
                90% {
                    -webkit-transform: translateY(-4px);
                    transform: translateY(-4px);
                }
            }
        }
    }

    /*for the responsieve screen of small and above*/
    @media screen and (min-width:500px){
      .product{
          height: 350px;
      }
    }

    /*for the responsieve screen of small and above*/
    @media screen and (min-width:700px){
      .product{
        width: 24%;
        height: 250px;
      }
    }

    /*for the responsieve screen of small and above*/
    @media screen and (min-width:900px){
      .product{
        width: 24%;
        height: 350px;
      }
    }
</style>