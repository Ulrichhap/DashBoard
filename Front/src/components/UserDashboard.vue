<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Données du Dashboard</h1>
      
      <!-- Affichage des données -->
      <ul v-if="data">
        <li v-for="(item, index) in data" :key="index" class="mb-2">
          {{ item }}
        </li>
      </ul>
  
      <p v-else>Chargement des données...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserDashboard',
    data() {
      return {
        data: null,
      };
    },
    methods: {
      // Méthode pour obtenir les données depuis le backend
      getData(){
        // Requête fetch pour obtenir les données depuis le backend
        fetch('http://localhost:3000/')
          .then(response => response.json())
          .then(data => {
            this.data = data;  // Assigner les données à la variable locale
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
          });
      }
    },
    mounted() {
      this.getData();  // Appeler la méthode pour obtenir les données
    },
  };
  </script>
  
  <style scoped>
  /* Styles optionnels pour styliser la liste des données */
  ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  li {
    color: #333;
  }
  </style>
  