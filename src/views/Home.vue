<template>
  <div class="home">
      <Banner />
      <Gridsection :images="images"/>
      <div class="subHeading">
        <h2><hr>TRENDING<hr></h2>
        <p>Top view in this week</p>
      </div>
      <DefaultProduct 
        :products="products"
      />
      <Pagefooter />
  </div>
</template>


<script>
import Banner from '../components/Banner.vue'
import Pagefooter from '../components/Pagefooter.vue'
import Gridsection from '../components/Gridsection.vue'
import DefaultProduct from '../components/DefaultProduct.vue'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { onMounted, ref } from 'vue';

export default {
  name: 'Home',
  components: { Banner, Gridsection, DefaultProduct, Pagefooter },
   setup() {
      const db = getFirestore()
      const products = ref([])
      const images = ref([
          {imgUrl: 'https://cdn.shopify.com/s/files/1/0332/6420/5963/files/young-beautiful-woman-looking-trendy-girl-casual-summer-clothes-positive-funny-model-winking_1728x.jpg?v=1606209527', class: 'one', button: 'Women'},
          {imgUrl: 'https://cdn.shopify.com/s/files/1/0332/6420/5963/files/bag2_900x.jpg?v=1581730050', class: 'two', button: 'Accessories'},
          {imgUrl: 'https://cdn.shopify.com/s/files/1/0332/6420/5963/files/lemai3020112688_m4_2-0_900x.jpg?v=1606229788', class: 'three', button: 'Footwear'},
          {imgUrl: 'https://cdn.shopify.com/s/files/1/0332/6420/5963/files/p24-21_900x.jpg?v=1581731327', class: 'four', button: 'Watches'}
      ])

      const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(db, "Products"));
        querySnapshot.forEach((doc) => {
          products.value.push({id: doc.id, ...doc.data()})
        });
      }
      
      // fetching the products immediately the page loads
        fetchProducts()
    return { products, images }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

  .subHeading{
    margin: 30px auto 10px;

    h2{
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Poppins', sans-serif;

      hr{
        border: 1px solid black;
        width: 40px;
        margin: 0 5px;
      }
    }

    p{
      font-family: 'IM Fell Double Pica', serif;
      color: $fadeBlack;
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
</style>
