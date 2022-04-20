<template>
    <div class="pagefooter">
       <p> Copyright © 2022 <span>Keji Styling</span> all rights reserved. Powered by Saykeed</p>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    .pagefooter{
        margin: 40px auto;

        p{
            color: $fadeBlack;

            span{
                color: $kejiBlue;
            }
        }
    }
</style>