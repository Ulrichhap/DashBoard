<template>
  <div :class="['container mx-auto py-8', currentModeClass]">
    <h1 class="text-3xl font-bold text-center mb-6">Projects Dashboard</h1>

    <!-- Indicateur de chargement -->
    <div v-if="loading" class="text-center text-xl font-semibold" :class="loadingClass">
      Loading projects...
    </div>

    <!-- Boutons de Filtrage -->
    <div v-else class="flex flex-wrap justify-center mb-6 gap-2">
      <button
        v-for="field in researchFields"
        :key="field"
        @click="filterByField(field)"
        :class="{
          'bg-blue-500 text-white': selectedField === field,
          'bg-gray-200 text-gray-700': selectedField !== field
        }"
        class="py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out hover:bg-blue-400"
      >
        {{ field }}
      </button>
      <button
        @click="clearFilter"
        class="py-2 px-4 rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600"
      >
        Clear Filters
      </button>
    </div>

    <!-- Liste des projets filtrés -->
    <div v-if="filteredProjects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in filteredProjects"
        :key="project.projectName"
        class="p-6 shadow-lg rounded-lg flex flex-col transition duration-200 ease-in-out hover:shadow-xl min-h-[400px]"
        :class="[cardBackgroundClass]"
      >
        <h2 class="text-2xl font-semibold mb-2">{{ project.projectName }}</h2>
        <p class="mb-2" :class="textClass"><strong>Research Field:</strong> {{ project.researchField }}</p>
        <p class="mb-2" :class="textClass"><strong>Institution:</strong> {{ project.leadInstitution }}</p>
        <p class="mb-4" :class="textClass"><strong>Start Date:</strong> {{ project.startDate }} | <strong>End Date:</strong> {{ project.endDate }}</p>

        <!-- Détails de financement -->
        <h3 class="text-xl font-semibold mb-2" :class="textClass">Funding:</h3>
        <ul class="list-inside">
          <li
            v-for="source in project.funding.sources"
            :key="source.name"
            :class="textClass"
          >
            {{ source.name }}: <span :class="['font-semibold', fundingAmountClass]">${{ source.amount.toLocaleString() }}</span>
          </li>
        </ul>

        <!-- Équipe de recherche stylisée -->
        <h3 class="text-xl font-semibold mt-4 mb-2" :class="textClass">Research Team:</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="member in project.researchTeam"
            :key="member.name"
            class="p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 ease-in-out text-center min-h-[150px]"
            :class="[teamMemberBackgroundClass]"
          >
            <h4 class="text-lg font-semibold mb-2" :class="textClass">{{ member.name }}</h4>
            <p class="font-medium" :class="textClass">{{ member.role }}</p>
            <p :class="textClass">{{ member.specialty }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Message si aucun projet n'est trouvé -->
    <div v-else class="text-center text-xl" :class="noProjectsClass">
      No projects found.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      projects: [],
      selectedField: null,
      loading: true, // État de chargement
    };
  },
  computed: {
    ...mapGetters(['currentMode']),
    researchFields() {
      // Récupérer les domaines de recherche uniques
      return this.projects.length ? [...new Set(this.projects.map(project => project.researchField))] : [];
    },
    filteredProjects() {
      // Filtrer les projets selon le champ de recherche sélectionné
      if (this.selectedField) {
        return this.projects.filter(project => project.researchField === this.selectedField);
      }
      return this.projects;
    },
    currentModeClass() {
      return this.currentMode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
    },
    loadingClass() {
      return this.currentMode === 'dark' ? 'text-blue-400' : 'text-blue-500';
    },
    cardBackgroundClass() {
      return this.currentMode === 'dark' ? 'bg-gray-800' : 'bg-white';
    },
    textClass() {
      return this.currentMode === 'dark' ? 'text-gray-300' : 'text-gray-700';
    },
    fundingAmountClass() {
      return this.currentMode === 'dark' ? 'text-green-400' : 'text-green-600';
    },
    teamMemberBackgroundClass() {
      return this.currentMode === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    },
    noProjectsClass() {
      return this.currentMode === 'dark' ? 'text-gray-400' : 'text-gray-500';
    },
  },
  methods: {
    filterByField(field) {
      this.selectedField = field;
    },
    clearFilter() {
      this.selectedField = null;
    },
    showProjectDetails(project) {
      // Logique pour afficher plus de détails sur le projet
      console.log('Project Details:', project);
    },
    fetchProjects() {
      fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(data => {
          this.projects = data; // Assigner les données à la variable locale
          this.loading = false; // Arrêter l'état de chargement une fois les données reçues
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données:', error);
          this.loading = false; // Stopper l'état de chargement même en cas d'erreur
        });
    },
  },
  mounted() {
    this.fetchProjects(); // Appeler cette fonction lorsque le composant est monté
  },
};
</script>

<style scoped>
/* Styles supplémentaires */
button {
  transition: background-color 0.3s ease;
}

ul.list-inside li {
  list-style-type: none;
  padding-left: 1em;
}

ul.list-inside li:before {
  content: '•';
  font-weight: bold;
  margin-right: 0.5em;
  color: #1d4ed8;
}

/* Styles pour fixer la taille des blocs de projets */
div.grid > div {
  min-height: 00px; /* Hauteur minimale pour les blocs de projets */
}

div.grid .min-h-[150px] {
  min-height: 150px; /* Taille des cartes de membres de l'équipe de recherche */
}
</style>
