<template>
  <div class="charts">
    <div class="page-header">
      <h1 class="page-header--title">{{ title }}</h1>
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
      colorErrorList: {
        debug: 'rgba(46, 91, 255, 0.6)',
        error: '#e84a50',
        warning: '#eacb1b',
      },
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
      const mapColorList = (item, index) => this.colorList[index % this.colorList.length];

      this.$http.get('errors/').then((response) => {
        response.data.reverse().forEach((error) => {
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
        this.chartColumnColors = this.chartColumnData.map(mapColorList);
        this.chartPieColors = this.chartPieData.map((item) => this.colorErrorList[item[0]]);
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.charts {
  margin-bottom: 1rem;

  @media (max-width: 1023px) {
    padding: 0 0.5rem;
  }

  .page-header {
    margin-top: 1.5rem;
  }
}
.chart-style {
  margin-top: 30px;
  padding: 12px;
  background-color: #ffffff;
  border: 1px solid #e4ebff;
}
.chart-title-style {
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1em;
  text-transform: uppercase;
  color: #2e384d;
  padding: 20px 0 15px 0;
}
</style>
