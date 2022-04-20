<template>
    <div class="defaultProducts">
        <Product 
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
    </div>
</template>

<script>
import Product from '../components/Product.vue'
export default {
    components: { Product },
    props: ['products']
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    .defaultProducts{
        margin: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
    }
</style>