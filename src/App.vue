<template>
  <Header 
    @showsidebar="toggleSidebar"
  />

  <Sidebar 
    v-if="sidebarStatus"
    @closeSidebar="toggleSidebar"
  />
  
  <router-view class="pages"/>

  <Footer />
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Sidebar from './components/Sidebar.vue'
import { ref,} from 'vue'


export default {
  components: { Header, Footer, Sidebar },
  setup() {
        // variables
        const sidebarStatus = ref(false)


        // functions
        const toggleSidebar = () => {
          sidebarStatus.value = !sidebarStatus.value
        }

        
    return { sidebarStatus, toggleSidebar}
  },
}
</script>

<style lang="scss">




#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;

  .pages{
    margin: 60px auto 70px;
  }

}


</style>
