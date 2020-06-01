<template>
  <div class="main">
    <PageHeader />
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
      <div class="chart-style">
        <h2 class="subtitle-style">
          Erros nas aplicações
        </h2>
        <!-- Gráfico de linha -->
        <line-chart
          :data="dataChart"
          :dataset="{
            fill:true,
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
        <h2 class="subtitle-style">
        Tipos de erros
        </h2>
        <!-- Gráfico de colunas -->
        <column-chart
          v-if="chartColumnData.length > 0"
          :data="chartColumnData"
          :library="libraryOptions"
          :dataset="{
          borderColor: chartColumnData.map((item, index) => colorList[index % colorList.length]),
          backgroundColor: chartColumnData.map((item, index) => colorList[index % colorList.length])
          }"
          xtitle="Nome do Erro"
          ytitle="Nº de erros"
          label="Ocorrência"
        >
        </column-chart>
        <h2 class="subtitle-style">
          Quantidade de erros por nível
        </h2>
        <!-- Gráfico de pizza -->
        <pie-chart
          :data="chartPieData"
          :donut="true"
          :colors="chartPieData.map((item, index) => colorList[index % colorList.length])"
          legend="bottom"
          :library="{
            animation: {
              duration: 1000,
            },
            legend: {
              labels: {
                fontColor: '#6a7079'
              }
            }
          }"
        >
        </pie-chart>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';

export default {
  data() {
    return {
      colorList: ['#2E5BFF', '#8C54FF', '#00C1D4', '#FAD050'],
      dataChart: [],
      chartPieData: [],
      chartColumnData: [],
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
  components: {
    PageHeader,
  },
  mounted() {
    const errorsByDay = new Map();
    const qntByError = new Map();
    const qntByLevel = new Map();
    this.$http.get('errors/').then((response) => {
      response.data.reverse().forEach((e) => {
        const day = new Date(e.last_date);
        const dayString = day.toLocaleDateString('pt-BR').slice(0, 5);
        if (errorsByDay.has(dayString)) {
          errorsByDay.set(dayString, errorsByDay.get(dayString) + 1);
        } else {
          errorsByDay.set(dayString, 1);
        }


        if (qntByError.has(e.title)) {
          qntByError.set(e.title, qntByError.get(e.title) + 1);
        } else {
          qntByError.set(e.title, 1);
        }


        if (qntByLevel.has(e.level)) {
          qntByLevel.set(e.level, qntByLevel.get(e.level) + 1);
        } else {
          qntByLevel.set(e.level, 1);
        }
      });
      this.dataChart = Array.from(errorsByDay.entries());
      this.chartColumnData = Array.from(qntByError.entries());
      this.chartPieData = Array.from(qntByLevel.entries());
    });
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
  .subtitle-style {
    font-size: 13px;
    line-height: 15px;
    text-transform: uppercase;
    color: #2e384d;
    padding: 20px 0 10px 0;
  }
</style>
