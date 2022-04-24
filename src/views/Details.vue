<template>
    <div class="details" v-if="product">
        <img :src="product.imgUrl" alt="">
        <div class="info">
            <p class="title">{{product.title }}</p>
            <p class="price">NGN {{product.price}}</p>
            <p class="description">{{product.description}}</p>
            <button @click="addToCart($route.params.id)">Add to Cart</button>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { ref } from 'vue';
import {useStore} from 'vuex'

export default {
    setup() {
        // variables
        const db = getFirestore()
        const store = useStore()
        const route = useRoute()
        const product = ref(null)

        
        // functions
        const fetchCart = async() => {
            console.log(route.params.id)
            const docRef = doc(db, "Products", route.params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                product.value = docSnap.data();
            } else {
                console.log("No such document!");
            }
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


        // invoked whenever the page loads
        fetchCart()
      return { product, addToCart }  
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    .details{
        padding: 20px;

        img{
            width: 100%;
            height: auto;
            object-fit: cover;
        }

        div.info{
            text-align: left;

            p{
                margin: 10px 0;
            }
            .title{
                color: Black;
                font-weight: 600;
                font-family: 'Poppins', sans-serif;
            }
            .price{
                color: $fadeBlack;
                font-size: 21px;
            }
            .description{
                color: $fadeBlack;
            }
            button{
                display: block;
                width: 90%;
                margin: 20px auto;
                line-height: 30px;
                background: $kejiBlue;
                color: white;
                border: none;
                border-radius: 20px;
                // animation: shakeHorizontal 4s linear infinite;
            }

            @keyframes shakeHorizontal {
                0%, 100%{
                    -webkit-transform: translateX(0);
                            transform: translateX(0);
                }
                5%{
                    -webkit-transform: translateX(20px);
                            transform: translateX(20px);
                }
                10%{
                    -webkit-transform: translateX(-20px);
                            transform: translateX(-20px);
                }
                20%, 30%, 40%, 50%, 60%{
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                65%{
                    -webkit-transform: translateX(20px);
                            transform: translateX(20px);
                }
                70%{
                    -webkit-transform: translateX(-20px);
                            transform: translateX(-20px);
                }
                80%, 90%{
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                
            }
        }
    }
    /*for the responsieve screen of small and above*/
    @media screen and (min-width:700px){
      .details{
          display: flex;
          align-items: center;
          justify-content: space-between;

          img{
              width: 50%;
          }
          div.info{
              width: 45%;
          }
      }
    }

</style>