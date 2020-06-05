<template>
  <div class="main">
    <div class="container">
      <div class="page-header level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="page-header--title">{{ title }}</h1>
          </div>
        </div>
        <div class="level-right">
          <router-link to="/">
            <p class="level-item">
              <a class="button is-primary">Voltar</a>
            </p>
          </router-link>
        </div>
      </div>
      <loading-page v-if="isLoading" key="loading"></loading-page>
      <div v-else class="chart-style">
        <h2 class="chart-title-style">Erros nas aplicações</h2>
        <line-chart
          :data="dataChart"
          :dataset="{
            fill: true,
            backgroundColor: '',
          }"
          :discrete="true"
          :color="['#rgb(46, 91, 255)']"
          label="Erros"
          xtitle="Data"
          ytitle="Nº de erros"
          :library="libraryOptions"
        >
        </line-chart>
        <h2 class="chart-title-style">Tipos de erros</h2>
        <column-chart
          v-if="chartColumnData.length > 0"
          :data="chartColumnData"
          :library="libraryOptions"
          :dataset="{
            borderColor: chartColumnColors,
            backgroundColor: chartColumnColors,
          }"
          xtitle="Nome do Erro"
          ytitle="Nº de erros"
          label="Ocorrência"
        >
        </column-chart>
        <h2 class="chart-title-style">Quantidade de erros por nível</h2>
        <pie-chart
          :data="chartPieData"
          :donut="true"
          :colors="chartPieColors"
          legend="bottom"
          :library="{
            animation: {
              duration: 1000,
            },
            legend: {
              labels: {
                fontColor: '#6a7079',
              },
            },
          }"
        >
        </pie-chart>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingPage from '@/components/LoadingPage.vue';

export default {
  components: {
    LoadingPage,
  },
  data() {
    return {
      isLoading: false,
      colorList: ['#2E5BFF', '#8C54FF', '#00C1D4', '#FAD050'],
      dataChart: [],
      chartPieData: [],
      chartColumnData: [],
      chartColumnColors: [],
      chartPieColors: [],
      title: 'Gráficos',
      libraryOptions: {
        animation: {
          duration: 1000,
        },
        legend: {
          labels: {
            fontColor: '#6a7079',
          },
        },
        scales: {
          yAxes: [
            {
              ticks: { fontColor: '#6a7079' },
              scaleLabel: { fontColor: '#6a7079', fontSize: 14 },
            },
          ],
          xAxes: [
            {
              ticks: { fontColor: '#6a7079' },
              scaleLabel: { fontColor: '#6a7079', fontSize: 14 },
            },
          ],
        },
      },
    };
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      const errorsByDay = new Map();
      const qntByError = new Map();
      const qntByLevel = new Map();
      const chartColors = (item, index) => this.colorList[index % this.colorList.length];

      this.$http.get('errors/').then(({ data }) => {
        data.reverse().forEach((error) => {
          const day = new Date(error.last_date);
          const dayString = day.toLocaleDateString('pt-BR').slice(0, 5);
          if (errorsByDay.has(dayString)) {
            errorsByDay.set(dayString, errorsByDay.get(dayString) + 1);
          } else {
            errorsByDay.set(dayString, 1);
          }

          if (qntByError.has(error.name)) {
            qntByError.set(error.name, qntByError.get(error.name) + 1);
          } else {
            qntByError.set(error.name, 1);
          }

          if (qntByLevel.has(error.level)) {
            qntByLevel.set(error.level, qntByLevel.get(error.level) + 1);
          } else {
            qntByLevel.set(error.level, 1);
          }
        });

        this.isLoading = false;
        this.dataChart = Array.from(errorsByDay.entries());
        this.chartColumnData = Array.from(qntByError.entries());
        this.chartPieData = Array.from(qntByLevel.entries());
        this.chartColumnColors = this.chartColumnData.map(chartColors);
        this.chartPieColors = this.chartPieData.map(chartColors);
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.chart-style {
  margin-top: 30px;
  padding: 12px;
  background-color: #ffffff;
  border: 1px solid #e4ebff;
}
.chart-title-style {
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 15px;
  text-transform: uppercase;
  color: #2e384d;
  padding: 20px 0 15px 0;
}
</style>
