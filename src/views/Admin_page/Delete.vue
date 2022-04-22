<template>
    <div class="delete">
        <h3>Delete Products</h3>

        <div class="deleteBox">
            <Deleteproduct 
                v-for="product in products"
                :key="product.id"
                :product="product"
                @reloadProducts="reloadProducts"
            />
        </div>
    </div>
</template>

<script>
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ref } from '@vue/reactivity';
import Deleteproduct from '@/components/Deleteproduct.vue'

export default {
    components: { Deleteproduct },
    setup() {
        // variables
        const db = getFirestore()
        const products = ref([])


        
        //functions
        const fetchProducts = async () => {
            products.value = []
            const querySnapshot = await getDocs(collection(db, "Products"));
            querySnapshot.forEach((doc) => {
            products.value.push({id: doc.id, ...doc.data()})
            });
        }
        const reloadProducts = () => {
            fetchProducts()
        }



        fetchProducts()
      return { products, reloadProducts }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    .delete{

        h3{
            margin: 80px auto 20px;
        }
    }
</style>