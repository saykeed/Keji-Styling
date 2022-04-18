

<template>
    <div :class="`imgBox ${grid.class}`">
        <div v-lazyimage class="images">
            <Kejianime class="anime"/>
            <img :data-url="grid.imgUrl" alt="">
        </div>
        <button>{{ grid.button }}</button>
    </div>
</template>

<script>
import Kejianime from '../components/Kejianime.vue'
export default {
    components: { Kejianime },
    props: ['grid']
}
</script>

<style lang="scss" >
@import "@/assets/scss/variable.scss";

    div.imgBox{
          position: relative;
          overflow: hidden;
          
          .images{
              position: relative;
              height: 100%;
              border: 1px solid blue;

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

                    &:hover img{
                        transform: scale(1.3);
                    }
                }
          }

          button{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 20px;
            background: white;
            width: 120px;
            border: none;
            padding: 10px 0;
            text-align: center;
            font-size: 1rem;
            font-weight: 600;
            box-shadow: 2px 2px 2px $lightShadow;
          }

          &.one{
            grid-column-start: 1;
            grid-column-end: 5;
            grid-row-start: 1;
            grid-row-end: 3;
          }
          &.two{
            grid-column-start: 1;
            grid-column-end: 3;
          }
          &.three{
            grid-column-start: 1;
            grid-column-end: 3;
          }
          &.four{
            grid-column-start: 3;
            grid-column-end: 5;
            grid-row-start: 3;
            grid-row-end: 5;
          }
          
    }
    
/*for the responsieve screen of md and above*/
@media screen and (min-width:800px){
    div{
        
        &.one{
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 3;
        }
        &.two{
            grid-column-start: 3;
            grid-column-end: 4;
        }
        &.three{
            grid-column-start: 3;
            grid-column-end: 4;
        }
        &.four{
            grid-column-start: 4;
            grid-column-end: 5;
            grid-row-start: 1;
            grid-row-end: 3;
        }
        
    }
}
</style>