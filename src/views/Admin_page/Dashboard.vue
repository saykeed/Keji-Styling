<template>
    <div class="dashboard">
        <router-link
          v-for="link in links"
          :key="link.text"
          :to="link.route"
        >
            {{ link.text }}
        </router-link>
        <button @click="logoutUser">Logout</button>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut  } from "firebase/auth";
import { useRouter } from 'vue-router'

export default {
    setup() {
        // variables
        const auth = getAuth();
        const router = useRouter();
        const links = ref([
            {text: 'Post Products', route: '/admin_page/dashboard/Products/post'},
            {text: 'Update Products', route: '/admin_page/dashboard/Products/update'},
            {text: 'Delete Products', route: '/admin_page/dashboard/Products/delete'}
        ])

        //functions
        const logoutUser = () => {
            signOut(auth).then(() => {
                alert('signed out successfully')
            }).catch((error) => {
                console.log('error happened')
            });
        }


        // mounted
        onMounted(() => {
            onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                alert('Welcome Admin')
            } else {
                router.push('/login')
            }
            });
        })

      return { links, logoutUser }
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
        button{
            background: $kejiBlue;
            color: white;
            line-height: 30px;
            text-align: center;
            width: 120px;
            border: none;
            border-radius: 5px;
        }
    }

</style>