<template>
  <Header 
    @showsidebar="toggleSidebar"
    class="mobileHeader"
  />
  <Bigheader 
    class="desktopHeader"
  />

  <Sidebar 
    v-if="sidebarStatus"
    @closeSidebar="toggleSidebar"
  />
  
  <router-view class="pages"/>

  <Footer 
    v-if="headerStatus"
    class="generalFooter"
  />
</template>

<script>
import Header from './components/Header.vue'
import Bigheader from './components/Bigheader.vue'
import Footer from './components/Footer.vue'
import Sidebar from './components/Sidebar.vue'
import { computed, ref,} from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  components: { Header, Footer, Sidebar, Bigheader },
  setup() {
        // variables
        const sidebarStatus = ref(false)
        const router = useRouter()
        const route = useRoute()
    

        // functions
        const toggleSidebar = () => {
          sidebarStatus.value = !sidebarStatus.value
        }


        // router navigation guards
        router.afterEach(() => {
          sidebarStatus.value = false;
          console.log(window.innerWidth)
        })

       // computed properties
       const headerStatus = computed(() => {
          let forbidden = ['Update', 'Post', 'Delete']
          if(forbidden.includes(route.name)) {
            return false
          } else{
            return true
          }
       })

       

        
    return { sidebarStatus, toggleSidebar, headerStatus }
  },
}
</script>

<style lang="scss">

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    .desktopHeader{
      display: none;
    }
    
    .pages{
      margin: 60px auto 70px;
    }

}

/*for the responsieve screen of md and above*/
    @media screen and (min-width:800px){
        #app {
          .mobileHeader{
            display: none;
          }
          .generalFooter{
            display: none;
          }
          .desktopHeader{
            display: flex;
          }

      }


        
    }


</style>
