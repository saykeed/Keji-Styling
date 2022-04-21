<template>
    <div class="dashboard">
        <router-link
          v-for="link in links"
          :key="link.text"
          :to="link.route"
        >
            {{ link.text }}
        </router-link>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const links = ref([
            {text: 'Post Products', route: '/admin/post'},
            {text: 'Update Products', route: '/admin/update'},
            {text: 'Delete Products', route: '/admin/delete'}
        ])

      return { links }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    .dashboard{
        padding-top: 40px;

        a{
            text-decoration: none;
            display: block;
            width: 90%;
            max-width: 500px;
            line-height: 40px;
            //box-shadow: 2px 2px 2px $lightShadow, -2px -2px 2px $lightShadow;
            box-shadow: 2px 2px 5px $kejiBlue;
            border-radius: 20px;
            margin: 30px auto;
            color:$kejiBlue;
            font-weight: 600;
            transition: all .5s ease-in-out;

            &:active{
                background: $kejiBlue;
                color: white;
            }
            
            &:hover{
                background: $kejiBlue;
                color: white;
            }

        }
    }

</style>