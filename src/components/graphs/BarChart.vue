<template>
  <div ref="main" class="graph-view"></div>
</template>

<script setup>
import * as echarts from 'echarts/core'
import { TitleComponent, GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { ref, onMounted } from 'vue'

echarts.use([GridComponent, BarChart, CanvasRenderer, TitleComponent])
const props = defineProps({
  xAxis: Array,
  data: Array,
})

const main = ref(null)
const option = {
  title: {
    text: '成绩分布图',
    left: 'center',
  },
  xAxis: {
    type: 'category',
    data: props.xAxis,
  },
  yAxis: {
    type: 'value',
  },
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      data: props.data,
      type: 'bar',
    },
  ],
}

onMounted(() => {
  const chartDom = main.value
  const myChart = echarts.init(chartDom)
  option && myChart.setOption(option)
})
</script>
