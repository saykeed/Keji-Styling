<template>
    <div class="cart">
        <div class="cartHeader">
            SHOPPING CART
        </div>
        <div class="cartBox" v-if="cartpro.length">
            <Cartproduct 
                v-for="product in cartpro"
                :key="product.id"
                :product="product"
                @productRemoved="reloadCart"
            />
            <button @click="proceed">Proceed</button>
        </div>
        <div v-else>
            Empty cart
        </div>
        
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import { doc, getDoc, getFirestore } from "firebase/firestore"
import Cartproduct from '../components/Cartproduct.vue'

export default {
    components: { Cartproduct },
    setup() {
        // varibles
        const cartpro = ref([])
        const db = getFirestore()

        
        // functions
        const fetchCart = async(id) => {
            const docRef = doc(db, "Products", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                cartpro.value.push({...docSnap.data(), id: docSnap.id});
            } else {
                console.log("No such document!");
                deleteFromCart(id)
            }
        }
        const deleteFromCart = (id) => {
            let carted = JSON.parse(localStorage.getItem('cart'))
            localStorage.setItem('cart', JSON.stringify(carted.filter(favId => favId !== id)));
            // emit('productRemoved', [id])
            store.dispatch('getCartAmount')
        }
        const loadCart = () => {
            if (!localStorage.getItem('cart')) {
                localStorage.setItem('cart', '[]')
            }
            let carted = JSON.parse(localStorage.getItem('cart'))
            
            if(carted.length) {
                for (let i = 0; i < carted.length; i++) {
                    fetchCart(carted[i])
                }
            }
        }
        const reloadCart = (id) => {
            cartpro.value = cartpro.value.filter(item => item.id != id)
            
        }
        const proceed = () => {
            alert('proceeding')
            
        }

        // mounted
        onMounted(() => {
            loadCart()
        })

      return { cartpro, reloadCart, proceed }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.cart{

        .cartHeader{
            height: 120px;
            width: 100%;
            background: rgba(0, 0, 0, 0.618);
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #fff;
            font-family: Poppins;
        }
    }

</style>