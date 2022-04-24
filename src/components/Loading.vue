<template>
    <div class="loading">
        <h2>Keji Styling</h2>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.loading{
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $fadeBlack;
        z-index: 9999;
        
        h2{
            font-family: 'Roboto', sans-serif;
            color: white;
            animation: loading 2s linear infinite;
        }

        @keyframes loading {
            0%{ opacity: 0.3; transform: scale(0.6)}
            50%{opacity: 1; transform: scale(1.4)}
            100%{opacity: 0.3; transform: scale(0.6)}
        }
    }
</style>