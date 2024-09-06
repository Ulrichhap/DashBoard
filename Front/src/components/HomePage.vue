<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold text-center mb-6">Projects Dashboard</h1>

    <!-- Indicateur de chargement -->
    <div v-if="loading" class="text-center text-xl">
      Loading projects...
    </div>

    <!-- Boutons de Filtrage -->
    <div v-else class="flex justify-center mb-6">
      <button
        v-for="field in researchFields"
        :key="field"
        @click="filterByField(field)"
        :class="{
          'bg-blue-500 text-white': selectedField === field,
          'bg-gray-200 text-gray-700': selectedField !== field
        }"
        class="py-2 px-4 mx-2 rounded-lg transition duration-200 ease-in-out"
      >
        {{ field }}
      </button>
      <button
        @click="clearFilter"
        class="py-2 px-4 mx-2 rounded-lg bg-red-500 text-white"
      >
        Clear Filters
      </button>
    </div>

    <!-- Liste des projets filtrés -->
    <div v-if="filteredProjects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in filteredProjects" :key="project.projectName" class="p-6 bg-white shadow rounded-lg">
        <h2 class="text-2xl font-semibold">{{ project.projectName }}</h2>
        <p class="text-gray-700 mb-2"><strong>Research Field:</strong> {{ project.researchField }}</p>
        <p class="text-gray-700 mb-2"><strong>Institution:</strong> {{ project.leadInstitution }}</p>
        <p class="text-gray-700 mb-4"><strong>Start Date:</strong> {{ project.startDate }} | <strong>End Date:</strong> {{ project.endDate }}</p>

        <!-- Détails de financement -->
        <h3 class="text-xl font-semibold mb-2">Funding:</h3>
        <ul class="list-disc list-inside">
          <li v-for="source in project.funding.sources" :key="source.name" class="text-gray-700">
            {{ source.name }}: ${{ source.amount.toLocaleString() }}
          </li>
        </ul>

        <!-- Équipe de recherche -->
        <h3 class="text-xl font-semibold mt-4 mb-2">Research Team:</h3>
        <ul class="list-disc list-inside">
          <li v-for="member in project.researchTeam" :key="member.name" class="text-gray-700">
            {{ member.name }} ({{ member.role }} - {{ member.specialty }})
          </li>
        </ul>

        <!-- Bouton pour voir plus de détails -->
        <button @click="showProjectDetails(project)" class="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg">
          View Details
        </button>
      </div>
    </div>

    <!-- Message si aucun projet n'est trouvé -->
    <div v-else class="text-center text-xl">
      No projects found.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
      selectedField: null,
      loading: true, // État de chargement
    };
  },
  computed: {
    researchFields() {
      // S'assurer que projects n'est pas null avant de manipuler les données
      return this.projects.length ? [...new Set(this.projects.map(project => project.researchField))] : [];
    },
    filteredProjects() {
      if (this.selectedField) {
        return this.projects.filter(project => project.researchField === this.selectedField);
      }
      return this.projects;
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
/* Personnalisation supplémentaire si nécessaire */
</style>
