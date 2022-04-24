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

  <Loading 
    v-if="loadingStatus"
  />
</template>

<script>
import Header from './components/Header.vue'
import Bigheader from './components/Bigheader.vue'
import Footer from './components/Footer.vue'
import Sidebar from './components/Sidebar.vue'
import Loading from './components/Loading.vue'
import { computed, onMounted, ref,} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {useStore} from 'vuex'

export default {
  components: { Header, Footer, Sidebar, Bigheader, Loading },
  setup() {
        // variables
        const sidebarStatus = ref(false)
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
    

        // functions
        const toggleSidebar = () => {
          sidebarStatus.value = !sidebarStatus.value
        }


        // router navigation guards
        router.afterEach(() => {
          sidebarStatus.value = false;
        })

       // computed properties
       const headerStatus = computed(() => {
          let forbidden = ['Update', 'Post', 'Delete', 'Login']
          if(forbidden.includes(route.name)) {
            return false
          } else{
            return true
          }
       })

       const loadingStatus = computed(() => {
         return store.state.loading
       })

        // import {useStore} from 'vuex'
        // const store = useStore()
        // store.commit('updateLoadingStatus', true)
       
       
        
    return { sidebarStatus, toggleSidebar, headerStatus, loadingStatus }
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
