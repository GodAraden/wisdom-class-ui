<template>
  <div class="my-container-result">
    <a-table
      sticky
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 1500 }"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a-input-search
            v-model:value="record.score"
            enter-button="ok"
            placeholder="在这里输入分数"
            @search="confirmScore(record.id, record.score)"
          />
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { result as apiResult, score as apiScore } from '@/api/homework.js'
import { message } from 'ant-design-vue'
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { resultColumns } from '@/utils/staticdata.js'

const router = useRouter()
const props = defineProps({
  username: String,
  homeworkID: Number,
})

const columns = ref([])
const data = ref([])

const confirmScore = async (id, score) => {
  const res = await apiScore({ id, score })
  if (res.Code === 0) {
    message.success(res.data)
    init()
  }
}

const init = async () => {
  if (!props.homeworkID) return
  const res = await apiResult({ id: props.homeworkID })
  data.value = res.data.result
  columns.value = Object.assign([], resultColumns)
  for (const k of res.data.question) {
    columns.value.push({
      title: k.title,
      dataIndex: k.key,
    })
  }
  columns.value.push({
    title: '评分（可以使用回车键确认）',
    key: 'operation',
    fixed: 'right',
    width: 240,
  })
}

watch(() => props.homeworkID, init, { immediate: true })
</script>
