<template>
    <div class="deleteProduct">
        <img :src="product.imgUrl" alt="">
        <div class="updateInfo">
            <div class="productInfo">
                <p class="title">{{ product.title }}</p>
                <p class="price">NGN {{ product.price }}</p>
            </div>
            <button @click="deleteProduct(product.id)">Delete</button>
        </div>
    </div>
</template>

<script>
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

export default {
    props: ['product'],
    setup(props, { emit }) {
        // variables
        const db = getFirestore()

        // functions
        const deleteProduct = async (id) => {
           deleteDoc(doc(db, "Products", props.product.id))
           .then(() => {
               alert('Product Deleted Successfully')
               emit('reloadProducts')
           })
        }
        

      return { deleteProduct }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    .deleteProduct{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 120px;
        padding: 0.3rem;
        box-shadow: 2px 2px 5px red;
        width: 90%;
        max-width: 400px;
        margin: 15px auto;

        img{
            width: 40%;
            height: 100%;
            object-fit: cover;
        }

        div.updateInfo{
            width: 50%;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 90%;

            .productInfo{

                p{
                    color: $fadeBlack;
                }
            }
            

            button{
                line-height: 30px;
                width: 100px;
                background: red;
                color: white;
                border: none;
                border-radius: 20px;
            }
        }
    }
</style>