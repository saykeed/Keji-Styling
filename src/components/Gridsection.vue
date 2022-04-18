<template>
        <div class="gridSection">
          <Images 
            v-for="grid in grids"
            :key="grid.id"
            :grid="grid"
          />
      </div>
      
      
</template>

<script>
import { ref } from '@vue/reactivity'
import Images from '../components/Images.vue'


export default {
  props: [ "grids" ],
  components: { Images },
  setup() {
    
    

    return {  }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

      .gridSection{
        display: grid;
        justify-content: center;
        height: 800px;
        grid-template-columns: 23% 23% 23% 23%;
        grid-template-rows: 24% 24% 24% 24%;
        gap: 10px;
        margin: 20px;

        
        
      }

      /*for the responsieve screen of md and above*/
    @media screen and (min-width:800px){
        .gridSection{
          grid-template-columns: 23% 23% 23% 23%;
          grid-template-rows: 50% 50%;
        }
        
    }
    
    
</style>