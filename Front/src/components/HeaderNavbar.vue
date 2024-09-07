<template>
  <header :class="['pointer-events-none relative z-50 flex flex-none flex-col']">
    <div class="top-0 z-10 h-16 pt-6">
      <div class="sm:px-8 top-[var(--header-top,theme(spacing.6))] w-full">
        <div class="mx-auto w-full max-w-7xl lg:px-8">
          <div class="relative px-4 sm:px-8 lg:px-12">
            <div class="mx-auto max-w-2xl lg:max-w-5xl">
              <div class="relative flex gap-4">
                <!-- Avatar -->
                <div class="flex flex-1">
                  <div
                    :class="['h-10 w-10 rounded-full p-0.5 shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur', currentMode === 'dark' ? 'bg-zinc-800/90 ring-white/10' : 'bg-white/90 ring-zinc-900/5']">
                    <a aria-label="Home" class="pointer-events-auto" href="/">
                      <img alt="Avatar" fetchpriority="high" width="512" height="512" decoding="async"
                        class="rounded-full object-cover h-9 w-9"
                        :class="currentMode === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'"
                        src="../assets/logoH.png" />
                    </a>
                  </div>
                </div>

                <!-- Menu Mobile -->
                <div class="flex flex-1 justify-end md:justify-center">
                  <div class="pointer-events-auto md:hidden">
                    <button @click="toggleMenu"
                      :class="['group flex items-center rounded-full px-4 py-2 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur', currentMode === 'dark' ? 'bg-zinc-800/90 text-zinc-200 ring-white/10 dark:hover:ring-white/20' : 'bg-white/90 text-zinc-800 ring-zinc-900/5']"
                      type="button" aria-expanded="false">
                      Menu
                      <svg viewBox="0 0 8 6" aria-hidden="true"
                        :class="['ml-3 h-auto w-2 stroke-zinc-500', currentMode === 'dark' ? 'dark:group-hover:stroke-zinc-400' : 'group-hover:stroke-zinc-700']">
                        <path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                  <!-- Menu Navigation -->
                  <nav v-show="!isMenuOpen" class="pointer-events-auto hidden md:block">
                    <ul
                      :class="['flex rounded-full px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur', currentMode === 'dark' ? 'bg-zinc-800/90 text-zinc-200 ring-white/10' : 'bg-white/90 text-zinc-800 ring-zinc-900/5']">
                      <li><a :class="['relative block px-3 py-2 transition', currentMode === 'dark' ? 'dark:text-teal-400' : 'text-teal-500']" href="/about">Anime</a></li>
                      <li><a class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                        href="/projects">Projects</a></li>
                      <li><a class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                          href="/articles">Dashboard</a></li>
                      <li><a class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                          href="/uses">Contact</a></li>
                    </ul>
                  </nav>
                </div>

                <!-- Dark Mode Switch -->
                <div class="flex justify-end md:flex-1">
                  <div class="pointer-events-auto">
                    <BoutonIcon
                      :class="['group rounded-full px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur transition', currentMode === 'dark' ? 'bg-zinc-800/90 ring-white/10 dark:hover:ring-white/20' : 'bg-white/90 ring-zinc-900/5']"
                      @click="toggleMode" :iconName="currentIcon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import BoutonIcon from '@/components/BtnIcon.vue';

export default {
  name: 'HeaderNavbar',
  data() {
    return {
      isMenuOpen: false, // État primaire du menu mobile
    };
  },
  components: {
    BoutonIcon,
  },
  computed: {
    ...mapGetters(['currentMode']), // Récupère le mode depuis le store
    currentIcon() {
      return this.currentMode === 'dark' ? 'moon' : 'sun'; // Basculer l'icône en fonction du mode
    },
  },
  methods: {
    ...mapActions(['toggleMode']), // Action pour basculer de mode
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Action pour l'affichage du menu mobile
    },
  },
};
</script>

<style scoped>
.header-nav {
  background: transparent;
  z-index: 1000;
  pointer-events: auto;
}

.header-nav a {
  transition: color 0.3s ease;
}

.header-nav a:hover {
  color: var(--teal-hover-color, teal);
}

.pointer-events-auto button {
  transition: background-color 0.3s ease;
}
</style>
