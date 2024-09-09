<template>
  <div class="dashboard-container">
    <h1 class="text-4xl font-bold mb-6 text-center">Tableau de bord des Hôpitaux</h1>

    <!-- Filtres -->
    <div class="filters-container grid grid-cols-3 gap-4 mb-8">
      <div>
        <label for="hospitalSelect" class="block font-semibold mb-2">Sélectionnez un hôpital :</label>
        <select v-model="selectedHospital" id="hospitalSelect" class="select-input">
          <option v-for="hospital in hospitals" :key="hospital.name" :value="hospital">
            {{ hospital.name }} - {{ hospital.location }}
          </option>
        </select>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="charts-container grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="chart-box">
        <h2 class="chart-title">Hospitalisations Mensuelles</h2>
        <div id="hospitalizationChart" class="chart"></div>
      </div>
      
      <div class="chart-box">
        <h2 class="chart-title">Répartition des Spécialités Médicales</h2>
        <div id="doctorSpecialtyChart" class="chart"></div>
      </div>

      <!-- Ajouter plus de graphiques ici si nécessaire -->
    </div>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  data() {
    return {
      hospitals: [],
      selectedHospital: null,
      filters: {
        year: null,
        specialty: null
      }
    };
  },
  computed: {
    filteredHospitalizations() {
      return this.selectedHospital.monthlyHospitalizations.filter(item => {
        return !this.filters.year || item.year == this.filters.year;
      });
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await fetch('http://localhost:3000/hospital');
        if (!response.ok) throw new Error('Network response was not ok');
        this.hospitals = await response.json();
        this.selectedHospital = this.hospitals[0]; // Sélectionner le premier hôpital par défaut
        this.createCharts();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    createCharts() {
      this.createHospitalizationChart();
      this.createDoctorSpecialtyChart();
    },
    createHospitalizationChart() {
      let chart = am4core.create("hospitalizationChart", am4charts.XYChart);
      chart.data = this.filteredHospitalizations;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "month";
      categoryAxis.title.text = "Mois";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Hospitalisations";

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "month";
      series.name = "Hospitalisations";
      series.tooltipText = "{categoryX}: [bold]{valueY}[/]";

      chart.cursor = new am4charts.XYCursor();
      chart.scrollbarX = new am4core.Scrollbar();
    },
    createDoctorSpecialtyChart() {
      let chart = am4core.create("doctorSpecialtyChart", am4charts.PieChart);
      chart.data = this.selectedHospital.doctorSpecialties;

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "numberOfDoctors";
      pieSeries.dataFields.category = "specialty";
      pieSeries.slices.template.tooltipText = "{category}: {value}";

      chart.legend = new am4charts.Legend();
    },
  },
  watch: {
    selectedHospital(newVal) {
      if (newVal) {
        this.createCharts(); // Recréer les graphiques en fonction de l'hôpital sélectionné
      }
    },
  }
};
</script>

<style scoped>
.dashboard-container {
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

.chart-box {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-title {
  text-align: center;
  font-size: 18px;
  margin-bottom: 12px;
}

.chart {
  width: 100%;
  height: 400px;
}
</style>
