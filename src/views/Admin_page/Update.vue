<template>
    <div class="update">
        <h3>Update Products</h3>
        
        <div class="updateBox">
            <Updateproduct 
                v-for="product in products"
                :key="product.id"
                :product="product"
                @showModal="showModal"
            />
        </div>
        <Updatemodal 
            v-if="modalStatus"
            :data="updateProp"
            @closeModal="closeModal"
            @quickCloseModal="quickCloseModal"
        />
    </div>
</template>

<script>
import { collection, getDocs, getFirestore, doc, getDoc, onSnapshot } from "firebase/firestore";
import { ref } from '@vue/reactivity';
import Updateproduct from '@/components/Updateproduct.vue'
import Updatemodal from '@/components/Updatemodal.vue'

export default {
    components: { Updateproduct, Updatemodal },
    setup() {
        // variables
        const db = getFirestore()
        const products = ref([])
        const modalStatus = ref(false)
        const updateProp = ref(null)
 

        //functions
        const fetchProducts = async () => {
            products.value = []
            const querySnapshot = await getDocs(collection(db, "Products"));
            querySnapshot.forEach((doc) => {
            products.value.push({id: doc.id, ...doc.data()})
            });
        }
        const showModal = async (id) => {
            let proId = String(id)
            const docRef = doc(db, "Products", proId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                updateProp.value = {id: docSnap.id, ...docSnap.data()};
                if(updateProp.value) {
                    modalStatus.value = true;
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        const closeModal = () => {
            modalStatus.value = false;
            fetchProducts()
        }
        const quickCloseModal = () => {
            modalStatus.value = false;
        }
        
      
        // fetching the products immediately the page loads
        fetchProducts()

        

      return { products, showModal, modalStatus, updateProp, closeModal, quickCloseModal }  
    }
}
</script>

<style>

</style>