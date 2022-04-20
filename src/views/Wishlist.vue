<template>
    <div class="wishlist">
        <div class="wishHeader">
            View your wishlist products
        </div>
        <div v-if="wishpro.length" class="wishBox">
            <Wishproduct 
              v-for="product in wishpro"
              :key="product.id"
              :product="product"
              @productRemoved="reloadCart"
            />
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Wishproduct from '../components/Wishproduct.vue'
import { doc, getDoc, getFirestore } from "firebase/firestore"

export default {
    components: { Wishproduct },
    setup() {
        // variables
        const db = getFirestore()
        const emptywish = ref(false);
        const wishpro = ref([])

        // functions
        const fetchCart = async(id) => {
            const docRef = doc(db, "Products", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            wishpro.value.push({...docSnap.data(), id: docSnap.id});
            } else {
            console.log("No such document!");
            }
        }
        const loadCart = () => {
            if (!localStorage.getItem('favorites')) {
                localStorage.setItem('favorites', '[]')
            }
            let favs = JSON.parse(localStorage.getItem('favorites'))
            if(favs.length) {
                for (let i = 0; i < favs.length; i++) {
                    fetchCart(favs[i])
                }
            } else{
                emptywish.value = true
            }
        }
        const reloadCart = (id) => {
            wishpro.value = wishpro.value.filter(item => item.id != id)
            if(!wishpro.value.length) {
                emptywish.value = true
            }
        }

        // mounted 
        onMounted(() => {
            loadCart()
        })

        return {wishpro, reloadCart}
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.wishlist{

        div.wishHeader{
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
        .wishBox{
            margin: 10px 20px;
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-around;
        }
    }
</style>