<template>
  <nav :class="['bg-gray-800 p-4', currentMode === 'dark' ? 'bg-gray-900' : 'bg-gray-800']">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <div class="text-white text-2xl font-bold">
        <img src="../assets/logoH.png" alt="Logo" class="h-10 inline-block mr-2" />
      </div>

      <!-- Hamburger Button (Responsive) -->
      <div class="block lg:hidden">
        <button @click="toggleMenu" class="text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <!-- Menu Links -->
      <div class="hidden lg:flex space-x-6">
        <a href="#" class="text-white hover:text-gray-400">Home</a>
        <a href="#" class="text-white hover:text-gray-400">Projects</a>
        <a href="#" class="text-white hover:text-gray-400">About</a>
        <a href="#" class="text-white hover:text-gray-400">Contact</a>
        <a class="text-white hover:text-gray-400">
          <button @click="toggleMode">Mode</button>
        </a>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="lg:hidden">
      <a href="#" class="block text-white bg-gray-900 p-2">Home</a>
      <a href="#" class="block text-white bg-gray-900 p-2">Projects</a>
      <a href="#" class="block text-white bg-gray-900 p-2">About</a>
      <a href="#" class="block text-white bg-gray-900 p-2">Contact</a>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HeaderNavbar',
  data() {
    return {
      isMenuOpen: false, // État du menu mobile
    };
  },
  computed: {
    ...mapGetters(['currentMode']), // Récupère le mode depuis le store
    navClass() {
      return this.currentMode === 'dark' ? 'bg-gray-900' : 'bg-gray-800';
    },
  },
  methods: {
    ...mapActions(['toggleMode']), // Action pour basculer le mode
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Bascule l'affichage du menu mobile
    },
  },
};
</script>

<style scoped>
/* Styles pour le composant HeaderNavbar */
</style>
