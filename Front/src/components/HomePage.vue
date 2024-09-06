<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold text-center mb-6">Projects Dashboard</h1>

    <!-- Indicateur de chargement -->
    <div v-if="loading" class="text-center text-xl text-blue-500 font-semibold">
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
      <div v-for="project in filteredProjects" :key="project.projectName" class="p-6 bg-white shadow-lg rounded-lg flex flex-col transition duration-200 ease-in-out hover:shadow-xl min-h-[400px]">
        <h2 class="text-2xl font-semibold mb-2">{{ project.projectName }}</h2>
        <p class="text-gray-700 mb-2"><strong>Research Field:</strong> {{ project.researchField }}</p>
        <p class="text-gray-700 mb-2"><strong>Institution:</strong> {{ project.leadInstitution }}</p>
        <p class="text-gray-700 mb-4"><strong>Start Date:</strong> {{ project.startDate }} | <strong>End Date:</strong> {{ project.endDate }}</p>

        <!-- Détails de financement -->
        <h3 class="text-xl font-semibold mb-2">Funding:</h3>
        <ul class="list-inside">
          <li v-for="source in project.funding.sources" :key="source.name" class="text-gray-700">
            {{ source.name }}: <span class="text-green-600 font-semibold">${{ source.amount.toLocaleString() }}</span>
          </li>
        </ul>

        <!-- Équipe de recherche stylisée -->
        <h3 class="text-xl font-semibold mt-4 mb-2">Research Team:</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="member in project.researchTeam" :key="member.name" class="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 ease-in-out text-center min-h-[150px]">
            <h4 class="text-lg font-semibold mb-2 text-gray-800">{{ member.name }}</h4>
            <p class="text-blue-500 font-medium">{{ member.role }}</p>
            <p class="text-gray-600">{{ member.specialty }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Message si aucun projet n'est trouvé -->
    <div v-else class="text-center text-xl text-gray-500">
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

.research-team-member {
  background-color: #f3f4f6; /* Couleur grise douce */
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
}

.research-team-member:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre au survol */
  transform: translateY(-2px); /* Légère translation */
  transition: all 0.2s ease-in-out;
}

.research-team-member h4 {
  font-size: 1.125rem;
  color: #111827;
}

.research-team-member p {
  color: #6b7280; 
}
</style>
