<template>
  <div class="product">
      <div v-lazyproduct  class="imgBox">
          <Kejianime class="anime"/>
          <img :data-url="product.imgUrl" alt="">
          <div class="cart">
            <i class="material-icons">shopping_cart</i>
        </div>
      </div>
      <div class="otherInfo">
          <p class="title">{{product.title}}</p>
          <p class="price">NGN {{ product.price }}</p>
      </div>
      <i class="material-icons wish">favorite_border</i>
  </div>
</template>

<script>
import Kejianime from '../components/Kejianime.vue'
export default {
    components: { Kejianime },
    props: ['product'],
    directives: {
        lazyproduct: {
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

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    .product{
        width: 48%;
        height: 250px;
        position: relative;
        margin: 10px auto;

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

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            left: 0;
            top: 0;
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

        i.wish{
            position: absolute;
            top: 5%;
            left: 5%;
            color: red;
            cursor: pointer;

            &:hover{
                animation: shakeVertical 1s  linear;
            }

            @keyframes shakeVertical {
                0%, 100% {
                    -webkit-transform: translateY(0);
                            transform: translateY(0);
                }
                10%, 30%, 50%, 70% {
                    -webkit-transform: translateY(-8px);
                    transform: translateY(-8px);
                }
                20%, 40%, 60% {
                    -webkit-transform: translateY(8px);
                    transform: translateY(8px);
                }
                80% {
                    -webkit-transform: translateY(6.4px);
                    transform: translateY(6.4px);
                }
                90% {
                    -webkit-transform: translateY(-6.4px);
                    transform: translateY(-6.4px);
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
</style>