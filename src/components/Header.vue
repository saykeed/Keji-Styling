<template>
    <div class="header">
        <i class="material-icons" @click="openSidebar">menu</i>
        <h2>Keji Styling</h2>
        <div class="cart">
            <i class="material-icons">shopping_cart</i>
            <p>1</p>
        </div>
        
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup(props, { emit }) {
        
        // functions
        const openSidebar = () => {
            emit('showsidebar')
        }

      return { openSidebar }
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
            color: $darkBlack;
        }
        i{
            color: $fadeBlack;
            cursor: pointer;
        }

        div.cart{
            position: relative;

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