<template>
    <div class="login">
        <form @submit.prevent="loginAdmin" class="login">
            <input type="email" name="email" placeholder="Email Address" required>
            <input type="password" name="password" placeholder="Password" required>
            <button>Login</button>
        </form>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'

export default {
    setup() {
        //variables
        const auth = getAuth();
        const router = useRouter();

        // functions
        const loginAdmin = () => {
            signInWithEmailAndPassword(auth, 'keji@styling.com', 'keji123#')
            .then((user) => {
                if(user) {
                    router.push('/admin/dashboard')
                }
            })
            .catch((error) => {
                console.log(error)
            });
        }

      return { loginAdmin }  
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    div.login{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        
        form.login{
            width: 90%;
            max-width: 500px;
            margin: 0 auto;
            padding: 10px;

            input{
                width: 100%;
                height: 40px;
                padding: 10px;
                border: 1px solid $lightShadow;
                border-radius: 5px;
                margin: 10px auto;
            }

            button{
                line-height: 30px;
                width: 100px;
                text-align: center;
                color: white;
                background: $kejiBlue;
                border: none;
                border-radius: 5px;
            }

        }
    }
</style>