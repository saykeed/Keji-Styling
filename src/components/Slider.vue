<template>
    <transition :name="slideName">
        <div class="slider"
            v-show="index == visibleSlide"
        >
            <img :src="image.img" alt="">
        </div>
    </transition>
</template>

<script>
export default {
    props: [ 'image', 'visibleSlide', 'index', 'slideName' ]
}
</script>

<style scoped>
    .slider{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    img{
        height: 200px;
        width: 100%;
        object-fit: cover;
    }
    
    .left-enter-active{
        animation: leftin .5s ease-in-out;
        
    }
    .left-leave-active{
        animation: leftout .5s ease-in-out;
        
    }
    @keyframes leftin{
        from {transform: translateX(100%)}
        to {transform: translateX(0)}
    }
    @keyframes leftout{
        from {transform: translateX(0)}
        to {transform: translateX(-100%)}
    }
    .right-enter-active{
        animation: rightin .5s ease-in-out
    }
    .right-leave-active{
        animation: rightout .5s ease-in-out
    }
    @keyframes rightin{
        from {transform: translateX(-100%)}
        to {transform: translateX(0)}
    }
    @keyframes rightout{
        from {transform: translateX(0)}
        to {transform: translateX(100%)}
    }



    /*for the responsieve screen of md and above*/
    @media screen and (min-width:800px){
        img{
            height: calc(100vh - 160px);
        }
    }
</style>