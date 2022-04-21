<template>
    <div class="updateproduct">
        <img :src="product.imgUrl" alt="">
        <div class="updateInfo">
            <div class="productInfo">
                <p class="title">{{ product.title }}</p>
                <p class="price">NGN {{ product.price }}</p>
            </div>
            <button @click="updateProduct(product.id)">Update</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['product'],
    setup(props, { emit }) {

        // variables
        const updateProduct = (id) => {
            emit('showModal', [id])
        }

      return { updateProduct }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    .updateproduct{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 120px;
        padding: 0.3rem;
        box-shadow: 2px 2px 5px $kejiBlue;
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
                background: $kejiBlue;
                color: white;
                border: none;
                border-radius: 20px;
            }
        }
    }
</style>