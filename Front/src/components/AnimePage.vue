<template>
  <div :class="['p-6 min-h-screen', currentModeClass]">
    <h1 class="text-3xl font-bold text-center mb-6">Anime Dashboard</h1>
    <div class="max-w-6xl mx-auto">
      <!-- Filter Section -->
      <div class="mb-6">
        <input
          v-model="search"
          type="text"
          placeholder="Filter by title or tag..."
          class="p-3 border rounded-md w-full lg:w-1/2 xl:w-1/3 shadow-sm focus:outline-none transition"
          :class="['border-gray-300', inputClass]"
        />
      </div>

      <!-- Anime Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="anime in filteredAnimes"
          :key="anime.title"
          @click="openAnimeDetails(anime)"
          class="p-4 rounded-lg shadow-md flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
          :class="[cardBackgroundClass]"
        >
          <img
            :src="anime.picture"
            :alt="anime.title"
            class="w-full h-56 object-cover rounded-t-lg"
          />
          <div class="mt-4 flex-1">
            <h2 class="text-xl font-semibold truncate">{{ anime.title }}</h2>
            <p class="mt-1">{{ anime.type }} - {{ anime.episodes }} episodes</p>
            <p>{{ anime.status }} - {{ anime.animeSeason.season }} {{ anime.animeSeason.year }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Anime Details Modal -->
    <div
      v-if="selectedAnime"
      class="fixed inset-0 bg-opacity-70 flex items-center justify-center"
      :class="['bg-gray-800', modalBackgroundClass]"
      @click.self="closeAnimeDetails"
    >
      <div class="p-6 rounded-lg shadow-lg max-w-3xl w-full relative" :class="modalClass">
        <!-- Close button -->
        <button
          @click="closeAnimeDetails"
          class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <i class="fas fa-times"></i> <!-- Icon or text for close -->
        </button>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <!-- Anime Image -->
          <div class="flex justify-center">
            <img
              :src="selectedAnime.picture"
              :alt="selectedAnime.title"
              class="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <!-- Anime Details -->
          <div>
            <h2 class="text-2xl font-semibold mb-4">{{ selectedAnime.title }}</h2>
            <p class="mb-2"><strong>Type:</strong> {{ selectedAnime.type }}</p>
            <p class="mb-2"><strong>Episodes:</strong> {{ selectedAnime.episodes }}</p>
            <p class="mb-2"><strong>Status:</strong> {{ selectedAnime.status }}</p>
            <p class="mb-2"><strong>Season:</strong> {{ selectedAnime.animeSeason.season }} {{ selectedAnime.animeSeason.year }}</p>

            <!-- Tags as badges, limited to 10 -->
            <div class="mt-4">
              <p class="font-semibold mb-2">Tags:</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in selectedAnime.tags.slice(0, 10)"
                  :key="tag"
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="['bg-blue-200', tagTextClass]"
                >
                  {{ tag }}
                </span>
              </div>
              <!-- Show 'more' if there are more than 10 tags -->
              <div v-if="selectedAnime.tags.length > 10" class="mt-2 text-sm text-gray-500">
                + {{ selectedAnime.tags.length - 10 }} more
              </div>
            </div>

            <!-- Synonyms as badges, limited to 10 -->
            <div class="mt-4">
              <p class="font-semibold mb-2">Synonyms:</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="synonym in selectedAnime.synonyms.slice(0, 10)"
                  :key="synonym"
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="['bg-green-200', synonymTextClass]"
                >
                  {{ synonym }}
                </span>
              </div>
              <!-- Show 'more' if there are more than 10 synonyms -->
              <div v-if="selectedAnime.synonyms.length > 10" class="mt-2 text-sm text-gray-500">
                + {{ selectedAnime.synonyms.length - 10 }} more
              </div>
            </div>

            <!-- Sources links -->
            <div class="flex flex-wrap gap-2 mt-4">
              <a
                v-for="source in selectedAnime.sources"
                :key="source"
                :href="source"
                target="_blank"
                class="text-blue-500 hover:underline"
              >
                Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      search: '',
      animes: [],
      selectedAnime: null, // For storing the selected anime
    };
  },
  computed: {
    ...mapGetters(['currentMode']),
    filteredAnimes() {
      const searchLower = this.search.toLowerCase();
      return this.animes.filter((anime) => {
        return (
          anime.title.toLowerCase().includes(searchLower) ||
          anime.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      });
    },
    currentModeClass() {
      return this.currentMode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
    },
    inputClass() {
      return this.currentMode === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900';
    },
    cardBackgroundClass() {
      return this.currentMode === 'dark' ? 'bg-gray-800' : 'bg-white';
    },
    modalBackgroundClass() {
      return this.currentMode === 'dark' ? 'bg-gray-800' : 'bg-white';
    },
    modalClass() {
      return this.currentMode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
    },
    tagTextClass() {
      return this.currentMode === 'dark' ? 'text-blue-400' : 'text-blue-800';
    },
    synonymTextClass() {
      return this.currentMode === 'dark' ? 'text-green-400' : 'text-green-800';
    },
  },
  methods: {
    async getData() {
      try {
        const response = await fetch('http://localhost:3000/anime');
        if (!response.ok) throw new Error('Network response was not ok');
        this.animes = await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    openAnimeDetails(anime) {
      this.selectedAnime = anime; // Set the clicked anime as selected
    },
    closeAnimeDetails() {
      this.selectedAnime = null; // Close the modal
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
/* Additional styles for a better visual */
.bg-cover {
  background-size: cover;
}

.cursor-pointer {
  cursor: pointer;
}

.bg-blue-200 {
  background-color: #bfdbfe;
}

.text-blue-800 {
  color: #1e40af;
}

.bg-green-200 {
  background-color: #bbf7d0;
}

.text-green-800 {
  color: #065f46;
}

button:focus {
  outline: none;
}
</style>
