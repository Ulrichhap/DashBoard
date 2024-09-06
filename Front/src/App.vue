<template>
  <UserDashboard />
  <HomePage />
</template>

<script>
import UserDashboard from './components/UserDashboard.vue'
import HomePage from './components/HomePage.vue'

export default {
  name: 'App',
  components: {
    UserDashboard,
    HomePage
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
  margin-top: 60px;
}
</style>
