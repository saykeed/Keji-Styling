<template>
    <div class="footer">
        <router-link
          v-for="link in links"
          :key="link.text"
          :to="link.route"
        >
          <i class="material-icons">{{ link.icon }}</i>
          <p>{{ link.text }}</p>
          <p v-show="link.tag == 'Wishlist'" class="tag">{{favAmount}}</p>
        </router-link>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import {useStore} from 'vuex'

export default {
    setup() {
        // variables
        const links = ref([
            {text: 'Home', tag: 'Home', route: '/', icon: 'home'},
            // {text: 'Shop', tag: 'Shop', route: '/', icon: 'dashboard'},
            {text: 'Wishlist', tag: 'Wishlist', route: '/wishlist', icon: 'favorite_border'},
            {text: 'Categories', tag: 'Categories', route: '/categories', icon: 'dashboard'}
        ])
        const store = useStore()



        // computed properties
        const favAmount = computed(() => {
            return store.state.fav
        })

        // mounted hook
        onMounted(() => {
            store.dispatch('getFavAmount')
        })


        return { links, favAmount }
    }
    
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    .footer{
        height: 60px;
        color: black;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2%;
        z-index: 99;
        background: white;
        box-shadow: 0px -2px 2px $lightShadow;

        a{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            text-decoration: none;
            color: $fadeBlack;
            position: relative;


            &.router-link-exact-active{
                color: $kejiBlue;
            }

            p.tag{
                background: black;
                width: 15px;
                height: 15px;
                border-radius: 15px;
                font-size: 10px;
                color: white;
                position: absolute;
                right: 10px;
                top: -5px;
                text-align: center;
                display:flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

</style>