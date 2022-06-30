<template>
  <template v-if="data.subsection">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="6">
        <a-statistic
          :title="`最低分：${data.min.number} ${data.min.name}`"
          :precision="2"
          :value="data.min.score"
        />
      </a-col>
      <a-col :span="6">
        <a-statistic title="平均分" :precision="2" :value="data.avg" />
      </a-col>
      <a-col :span="6">
        <a-statistic
          :title="`最高分：${data.max.number} ${data.max.name}`"
          :precision="2"
          :value="data.max.score"
        />
      </a-col>
    </a-row>
    <div class="data-view">
      <bar-chart
        :xAxis="data.subsection.xAxis"
        :data="data.subsection.data"
      ></bar-chart>
      <pie-chart :total="data.total"></pie-chart>
    </div>
    <div class="funcbar">
      <div class="funcGroup">
        成绩分布图区间长度：
        <a-input-number v-model:value="interval" :min="5" :max="40" />
        <a-button type="primary" @click="init">刷新</a-button>
      </div>
    </div>
  </template>
</template>

<script setup>
import { analyze as apiAnalyze } from '@/api/score.js'
import { ref, watch } from '@vue/runtime-core'
import BarChart from '@/components/graphs/BarChart.vue'
import PieChart from '@/components/graphs/PieChart.vue'

const props = defineProps({ subjectID: Number })
const interval = ref(10)
const data = ref({})

const init = async () => {
  if (!props.subjectID) return
  data.value = {}
  const res = await apiAnalyze({
    id: props.subjectID,
    interval: interval.value,
  })
  if (res.Code === 0) {
    data.value = res.data
  }
}

watch(() => props.subjectID, init, { immediate: true })
</script>

<style lang="less" scoped>
.ant-statistic {
  text-align: center;
}
.data-view {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
