<template>
    <div class="sidebarBackground" >
        <transition
            @beforeEnter="beforeEnter"
            @enter="enter"
        >
            <div class="sidebar">
                <h2>Keji Styling</h2>
                <router-link
                    v-for="link in links"
                    :key="link.text"
                    :to="link.route"
                    >
                    {{ link.text }}
                </router-link>
            </div>
        </transition>
        <div class="sideOverlay" @click="closeSidebar"></div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup(props, { emit }) {
        // variables
        const links = ref([
            // {text: 'Shop', route: '/Shop'},
            {text: 'Wishlist', route: '/wishlist'},
            {text: 'Categories', route: '/categories'},
            {text: 'Cart', route: '/cart'},
            {text: 'Admin Login', route: '/admin/dashboard'}
        ])



        // functions
        const closeSidebar = () => {
            emit('closeSidebar')
        }
        const beforeEnter = () => {
            console.log('beforeenter')
        }
        const enter = () => {
            console.log('enter')
        }

      return { closeSidebar, links, beforeEnter, enter }
    }
}
</script>

<style lang="scss">
 @import "@/assets/scss/variable.scss";
 
    .sidebarBackground{
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        background: $fadeBlack;
        z-index: 999;

        .sidebar{
            background: white;
            width: 250px;
            height: 100vh;
            position: absolute;
            left: 0;
            top: 0;

            h2{
                font-family: 'IM Fell Double Pica', serif;
                margin: 10px auto 20px;
            }

            a{
                text-decoration: none;
                display: block;
                text-align: left;
                font-size: 1.2rem;
                padding: 10px 20px;
                border-bottom: 1px solid $lightShadow;
                -webkit-tap-highlight-color: transparent;
                color: $kejiBlue;

                &.router-link-exact-active{
                    background: $kejiBlue;
                    color: white;
                }

                &:active{
                    background: $kejiBlue;
                    color: white;
                }

            }
        }
        .sideOverlay{
            height: 100vh;
            width: calc(100vw - 250px);
            position: absolute;
            right: 0;
            top: 0;
        }
    }

</style>