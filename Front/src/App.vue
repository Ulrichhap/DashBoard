<template>
  <div :class="['app-container', currentMode]"> 
    <div id="app">
      <HeaderNavbar />
    </div>
    <HomePage />
    <AnimePage />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import HeaderNavbar from './components/HeaderNavbar.vue'
import AnimePage from './components/AnimePage.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    HomePage,
    HeaderNavbar,
    AnimePage,
  },
  computed: {
    ...mapGetters(['currentMode']), // Récupère le mode depuis le store
  },
  mounted() {
    console.log('App mounted', this.currentMode);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app-container.light {
  background-color: #F3F4F6;
  color: #000000;
}

/* Styles pour le mode sombre */
.app-container.dark {
  background-color: #121826;
  color: #ffffff;
}
</style>
