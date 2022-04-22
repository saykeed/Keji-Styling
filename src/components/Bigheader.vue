<template>
    <div class="bigHeader">
        <router-link to="/" class="home">Keji Styling</router-link>
        <ul class="links">
            <li
              v-for="link in links"
              :key="link.route"
            >
                <p v-if="link.tag">{{link.tag}}</p>
                <router-link :to="link.route">{{ link.text }}</router-link>
            </li>
        </ul>
        <router-link to="/admin/dashboard" class="admin">Admin Dashboard</router-link>
        
    </div>
</template>

<script>
import { ref, computed, onMounted,  } from 'vue'
import {useStore} from 'vuex'

export default {
    setup(props, { emit }) {
        // computed properties
        const cartAmount = computed(() => {
            return store.state.cart
        })
        const favAmount = computed(() => {
            return store.state.fav
        })

        //variables
        const store = useStore();
        const links = ref([
            {text: 'Categories', route: '/categories', tag: ''},
            {text: 'Wishlist', route: '/wishlist', tag: favAmount},
            {text: 'Cart', route: '/cart', tag: cartAmount}
            // {text: 'Admin Login', route: '/admin/dashboard'}
        ])


        // functions
        

        

        // mounted hook
        onMounted(() => {
            store.dispatch('getCartAmount')
            store.dispatch('getFavAmount')
        })

      return { cartAmount, links, favAmount }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    .bigHeader{
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

        a.home{
            color: $darkBlack;
            text-decoration: none;
            font-family: 'Roboto', sans-serif;
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        ul.links{
            list-style-type: none;
            display: flex;
            align-items: center;
            justify-content: center;

            li{
                position: relative;
                line-height: 30px;

                p{
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    width: 20px;
                    height: 20px;
                    border-radius: 20px;
                    background: orange;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                }
                
                a{
                    padding: 0 15px;
                    text-decoration: none;
                    color: $fadeBlack;
                    transition: all .5s ease-in-out;


                    &:hover{
                        color: $kejiBlue;
                    }
                }
            }
        }

        a.admin{
            text-decoration: none;
            line-height: 40px;
            padding: 0 10px;
            background: $kejiBlue;
            color: white;
            border-radius: 15px 0 15px 0;
            transition: all .5s ease-in-out;

            &:hover{
                background: white;
                color: $kejiBlue;
                border: 1px solid $kejiBlue;
                border-radius: 0 15px 0 15px;
            }
        }

    }
</style>