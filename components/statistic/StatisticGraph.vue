<template>
  <div class="graph">
    <MLoader v-if="isLoaderGraph" size="32" />
    <canvas id="myChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto';
import {defineProps, onMounted, PropType, Ref, ref} from "vue";
import {IHistory} from "../../types/types";

const props = defineProps({
  histories: Array as PropType<Array<IHistory>>,
  address: String,
})
let isLoaderGraph: Ref<boolean> = ref(false);


onMounted(() => {
  isLoaderGraph.value = true;
  setTimeout(()=>{
    isLoaderGraph.value = false;
    createGraph();
  }, 2000);
})

function createGraph() {
  const dateToday = new Date;
  console.log(dateToday.getDate())
  console.log(props.histories);
  console.log(`${dateToday.getMonth()}/${dateToday.getDay()}/${dateToday.getFullYear()}`)
  console.log(new Date(dateToday.getFullYear(), dateToday.getMonth(), 0).getDate())
  const labels = props.histories ? props.histories.map((history: IHistory) => `${new Date(history.date).getMonth()}/${new Date(history.date).getDate()}/${new Date(history.date).getFullYear()}`) : [];
  const datasets = props.histories ? props.histories.map((history: IHistory) => history.profit) : [];
  // const daysInMonth = daysInMonth()
  const data = {
    labels: labels,
    datasets: [{
      label: '',
      backgroundColor: 'rgba(194,232,78,0)',
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 10,
      borderSkipped: false,
      data: datasets,
      pointStyle: 'rectRounded'
    }]
  }

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: false,
        },
        title: {
          display: true,
          text: ''
        }
      }
    },
  };
  const graph = new Chart(document.getElementById('myChart'), config);
}

</script>

<style scoped lang="scss">
  .graph {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  canvas {
    max-width: 100%;
    max-height: 100%;
    padding-right: 20px;
  }
</style>