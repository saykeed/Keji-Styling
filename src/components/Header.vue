<template>
    <div class="header">
        <i class="material-icons" @click="openSidebar">menu</i>
        <h2>Keji Styling</h2>
        <router-link to="/cart" class="cart">
            <i class="material-icons">shopping_cart</i>
            <p>{{cartAmount}}</p>
        </router-link>
        
    </div>
</template>

<script>
import { ref, computed, onMounted,  } from 'vue'
import {useStore} from 'vuex'

export default {
    setup(props, { emit }) {
        //variables
        const store = useStore()


        // functions
        const openSidebar = () => {
            emit('showsidebar')
        }

        // computed properties
        const cartAmount = computed(() => {
            return store.state.cart
        })

        // mounted hook
        onMounted(() => {
            store.dispatch('getCartAmount')
        })

      return { openSidebar, cartAmount }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    .header{
        height: 60px;
        color: black;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2%;
        z-index: 99;
        background: white;
        box-shadow: 2px 2px 2px $lightShadow;

        h2{
            font-family: 'Roboto', sans-serif;
            color: $darkBlack;
        }
        i{
            color: $fadeBlack;
            cursor: pointer;
        }

        a.cart{
            position: relative;
            display: block;

            &.router-link-exact-active{

                i{
                    color: $kejiBlue;
                }
                p{
                    background: $kejiBlue;
                }
                
            }

            p{
                background: black;
                width: 15px;
                height: 15px;
                border-radius: 15px;
                font-size: 10px;
                color: white;
                position: absolute;
                right: 0;
                top: -10px;
                text-align: center;
                display:flex;
                align-items: center;
                justify-content: center;
            }
        }

    }
</style>