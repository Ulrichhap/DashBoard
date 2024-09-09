<template>
  <div class="medication-dashboard">
    <h1 class="text-4xl font-bold mb-6 text-center">Tableau de bord des Médicaments</h1>

    <!-- Filtres -->
    <div class="filters-container grid grid-cols-3 gap-4 mb-8">
      <div>
        <label for="medicationSelect" class="block font-semibold mb-2">Sélectionnez un médicament :</label>
        <select v-model="selectedMedication" id="medicationSelect" class="select-input">
          <option value="">Tous les médicaments</option>
          <option v-for="medication in medications" :key="medication.name" :value="medication">
            {{ medication.name }}
          </option>
        </select>
      </div>

      <div v-if="selectedMedication">
        <label for="brandSelect" class="block font-semibold mb-2">Sélectionnez une marque :</label>
        <select v-model="selectedBrand" id="brandSelect" class="select-input">
          <option value="">Toutes les marques</option>
          <option v-for="brand in selectedMedication.medications" :key="brand.name" :value="brand">
            {{ brand.name }} - {{ brand.dosage }}
          </option>
        </select>
      </div>

      <div v-if="selectedBrand">
        <label for="dateFilter" class="block font-semibold mb-2">Filtrer par date :</label>
        <select v-model="selectedDate" id="dateFilter" class="select-input">
          <option value="">Toutes les dates</option>
          <option v-for="price in selectedBrand.priceHistory" :key="price.date" :value="price.date">
            {{ price.date }}
          </option>
        </select>
      </div>
    </div>

    <!-- Bouton de réinitialisation -->
    <div class="flex justify-end mb-6">
      <BoutonIcon
        :class="['group rounded-full px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur transition', currentMode === 'dark' ? 'bg-zinc-800/90 ring-white/10 dark:hover:ring-white/20' : 'bg-white/90 ring-zinc-900/5']"
        @click="resetFilters" :iconName="currentIcon"/>
    </div>

    <!-- Tableau des prix -->
    <div class="price-history mt-8">
      <h2 v-if="selectedBrand" class="text-2xl font-semibold mb-4">
        Historique des Prix pour {{ selectedBrand.name }}
      </h2>
      <h2 v-else class="text-2xl font-semibold mb-4">
        Historique des Prix pour Tous les Médicaments
      </h2>

      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Médicament</th>
            <th class="px-4 py-2">Marque</th>
            <th class="px-4 py-2">Dosage</th>
            <th class="px-4 py-2">Date</th>
            <th class="px-4 py-2">Prix en EUR</th>
            <th class="px-4 py-2">Prix en USD</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in displayedPriceHistory" :key="item.medicationName + item.brandName + item.date">
            <td class="border px-4 py-2">{{ item.medicationName }}</td>
            <td class="border px-4 py-2">{{ item.brandName }}</td>
            <td class="border px-4 py-2">{{ item.dosage }}</td>
            <td class="border px-4 py-2">{{ item.date }}</td>
            <td class="border px-4 py-2">{{ item.priceEUR }}€</td>
            <td class="border px-4 py-2">{{ item.priceUSD }}$</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BoutonIcon from '@/components/BtnIcon.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      medications: [],
      selectedMedication: null,
      selectedBrand: null,
      selectedDate: "",
    };
  },
  components: {
    BoutonIcon,
  },
  computed: {
    ...mapGetters(['currentMode']), // Récupère le mode depuis le store
    currentIcon() {
      return this.currentMode === 'dark' ? 'close_dark' : 'close_light'; // Basculer l'icône en fonction du mode
    },
    displayedPriceHistory() {
      let history = [];

      if (this.selectedMedication) {
        const brands = this.selectedBrand
          ? [this.selectedBrand]
          : this.selectedMedication.medications;

        brands.forEach(brand => {
          let prices = this.selectedDate
            ? brand.priceHistory.filter(price => price.date === this.selectedDate)
            : brand.priceHistory;

          prices.forEach(price => {
            history.push({
              medicationName: this.selectedMedication.name,
              brandName: brand.name,
              dosage: brand.dosage,
              date: price.date,
              priceEUR: price.priceEUR,
              priceUSD: price.priceUSD,
            });
          });
        });
      } else {
        this.medications.forEach(medication => {
          medication.medications.forEach(brand => {
            let prices = this.selectedDate
              ? brand.priceHistory.filter(price => price.date === this.selectedDate)
              : brand.priceHistory;

            prices.forEach(price => {
              history.push({
                medicationName: medication.name,
                brandName: brand.name,
                dosage: brand.dosage,
                date: price.date,
                priceEUR: price.priceEUR,
                priceUSD: price.priceUSD,
              });
            });
          });
        });
      }

      return history;
    },
  },
  methods: {
    async getData() {
      try {
        const response = await fetch("http://localhost:3000/medication");
        if (!response.ok) throw new Error("Network response was not ok");
        this.medications = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    resetFilters() {
      // Réinitialise tous les filtres
      this.selectedMedication = null;
      this.selectedBrand = null;
      this.selectedDate = "";
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.medication-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.select-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filters-container {
  display: grid;
  gap: 16px;
}

.price-history {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}
</style>