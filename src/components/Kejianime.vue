<template>
    <div class="kejianime">
        <h3>Keji Styling</h3>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    div.kejianime{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        h3{
            font-family: 'Roboto', sans-serif;
            animation: loading 2s linear infinite;
        }

        @keyframes loading {
            0%{ opacity: 0.3; transform: scale(0.7)}
            50%{opacity: 1; transform: scale(1)}
            100%{opacity: 0.3; transform: scale(0.7)}
        }
    }
</style>