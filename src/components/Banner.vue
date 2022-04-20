<template>
    <div class="banner">
        <Slider
            v-for="(image, index) in images"
            :key="image.img"
            :image="image"
            :visibleSlide="visibleSlide"
            :index="index"
            :slideName="slideName"
        />

        <div class="slideIndicator">
            <div
                v-for="(image, index) in images"
                :key="index"
                :class="{active: visibleSlide == index}"
                @click="slide(index)"
            ></div>
        </div>
    </div>
</template>

<script>
import Slider from '../components/Slider.vue'
import { ref } from '@vue/reactivity'
export default {
    components: { Slider },
    setup() {
        const images = ref([
            {img: 'https://cdn.shopify.com/s/files/1/0332/6420/5963/files/Slider3_1080x.jpg?v=1628696608'},
            {img: 'https://cdn.shopify.com/s/files/1/0332/6420/5963/files/Slider2_1080x.jpg?v=1628696591'},
            {img: 'https://cdn.shopify.com/s/files/1/0332/6420/5963/files/Slider1_2100x.jpg?v=1628696569'}
        ])
        const visibleSlide = ref(1)
        const slideName = ref('')

        // functions
        const slide = (index) => {
            if (index > visibleSlide.value) {
                slideName.value = 'left'
            } else {
                slideName.value = 'right'
            }
            switch (index) {
                case 0:
                    visibleSlide.value = 0
                break;
                case 1:
                    visibleSlide.value = 1
                break;
                case 2:
                    visibleSlide.value = 2
                break;
            
                default:
                break;
            }
        }

      return { images, visibleSlide, slide, slideName }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    .banner{
        width: 100%;
        position: relative;
        height: 200px;
        overflow: hidden;

        .slideIndicator{
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            transition: all 1s ease-in-out;

            div{
                width: 15px;
                height: 15px;
                border-radius: 15px;
                background: rgba(0, 0, 0, 0.375);
                margin: 0 5px;

                &.active{
                    background: black;
                }
            }
        }
    }


    /*for the responsieve screen of md and above*/
    @media screen and (min-width:700px){
        .banner{
            border: 1px solid red;
            height: calc(100vh - 160px);
        }
    }
</style>>
    
    
    .slideIndicator 
