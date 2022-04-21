<template>
    <div class="updateModalBackground">
        <div class="updateModal">
            <img :src="data.imgUrl" alt="">
            <form class="updateForm" @submit.prevent="updateData">
                <input type="text" name="title" placeholder="Title" v-model="title">
                <input type="number" name="amount" placeholder="Amount" v-model="price">
                <textarea name="description" placeholder="description" v-model="description"></textarea>
                <button>Update</button>
            </form>
            <button @click="quickCloseModal">Close Modal</button>
        </div>
    </div>
</template>

<script>
import { doc, getDoc, getFirestore,updateDoc  } from "firebase/firestore";
import { ref } from 'vue';

export default {
    props: ['data'],
    setup(props, { emit }) {
        // variables
        const db = getFirestore();
        const docRef = doc(db, "Products", props.data.id);
        const productData = ref(null)
        const title = ref(null)
        const price = ref(null)
        const description = ref(null)

        // functions
        const loadCurrentData = () => {
            productData.value = props.data
            title.value = productData.value.title
            price.value = productData.value.price
            description.value = productData.value.description
        }
        const updateData = async () => {
            //update the doc with new data
            updateDoc(docRef, {
                title: title.value,
                price: price.value,
                description: description.value
            })
            .then(() => {
                emit('closeModal')
                alert('Product Updated Successfully')
            })
        }
        const quickCloseModal = () => {
            emit('quickCloseModal')
        }

        loadCurrentData()

      return { productData, title, price, description, updateData, quickCloseModal }  
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    .updateModalBackground{
        height: 100vh;
        width: 100vw;
        background: $fadeBlack;
        position: fixed;
        left: 0;
        top: 0;

        .updateModal{
            background: white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 500px;

            img{
                width: 100px;
                height: 100px;
                margin: 10px auto;
                display: block;
                object-fit: cover;
            }

            form.updateForm{
                width: 90%;
                margin: 10px auto;


                input{
                    width: 100%;
                    height: 40px;
                    padding: 10px;
                    margin: 5px auto;
                    border: none;
                    border-radius: 5px;
                    border: 1px solid $kejiBlue;

                    &:focus{
                        outline: none;
                        border: none;
                        border-bottom: 2px solid $kejiBlue;
                    }
                }

                textarea{
                    width: 100%;
                    height: 100px;
                    padding: 10px;
                    margin: 5px auto;
                    border: none;
                    border-radius: 5px;
                    border: 1px solid $kejiBlue;

                    &:focus{
                        outline: none;
                        border-bottom: 2px solid $kejiBlue;
                    }
                }

                button{
                    line-height: 30px;
                    width: 100px;
                    border: none;
                    background: $kejiBlue;
                    color: white;
                    border-radius: 20px;
                }
            }

            button{
                margin: 20px auto;
                width: 90%;
                background: white;
                border: 1px solid $kejiBlue;
                color: $kejiBlue;
                line-height: 30px;
                text-align: center;
                border-radius: 5px;
            }
        }
    }

</style>