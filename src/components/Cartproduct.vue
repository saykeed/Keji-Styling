<template>
    <div class="cartProduct">
        <img :src="product.imgUrl" alt="product image">
        <div class="info">
            <p>{{ product.title }}</p>
            <h4>NGN {{ product.price }}</h4>
            <button @click="deleteFromCart(product.id)"><i class="material-icons"> delete </i> Delete</button>
        </div>
    </div>
</template>

<script>
import {useStore} from 'vuex'

export default {
    props: ['product'],
    setup(props, { emit }) {
        // variables
        const store = useStore()


        //functions
        const deleteFromCart = (id) => {
            let carted = JSON.parse(localStorage.getItem('cart'))
            localStorage.setItem('cart', JSON.stringify(carted.filter(favId => favId !== id)));
            emit('productRemoved', [id])
            store.dispatch('getCartAmount')
        }

      return { deleteFromCart }  
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    .cartProduct{
        height: 150px;
        width: 90%;
        max-width: 500px;
        margin: 10px auto;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 2px 2px 4px $lightShadow;

        img{
            width: 40%;
            height: 100%;
            object-fit: cover;
        }

        div.info{
            width: 50%;
            height: auto;
            text-align: left;

            h4{
                color: $fadeBlack;
                margin: 3px 0 20px;
            }

            button{
                line-height: 30px;
                width: 100px;
                text-align: center;
                background: $kejiBlue;
                color: white;
                border: none;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
        }
    }

</style>