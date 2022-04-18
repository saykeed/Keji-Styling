<template>
  <div class="product">
      <div  class="imgBox">
          <Kejianime class="anime"/>
          <img :src="product.imgUrl" alt="">
      </div>
      <div class="otherInfo">
          <p class="title">{{product.title}}</p>
          <p class="price">NGN {{ product.price }}</p>
      </div>
  </div>
</template>

<script>
import Kejianime from '../components/Kejianime.vue'
export default {
    components: { Kejianime },
    props: ['product']
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    .product{
        width: 48%;
        position: relative;

        .imgBox{
            width: 100%;
            height: 170px;
            position: relative;
        }
        .anime{
            position: absolute;
            left: 0;
            top: 0;
        }

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            left: 0;
            top: 0;
        }

        .otherInfo{
            text-align: left;

            p.title{
                color: black;
            }

            p.price{
                color: $fadeBlack;
            }
        }
    }
</style>