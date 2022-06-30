<template>
  <a-table
    :columns="columns"
    :data-source="homeworkList"
    :pagination="false"
    :scroll="{ y: '68vh' }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <a-button
          v-if="!record.answered"
          type="primary"
          @click="answer(record.id)"
          >作答</a-button
        >
        <a-button v-else-if="record.answered && record.score === null" disabled
          >已作答，待评分</a-button
        >
        <a-button v-else disabled>得分：{{ record.score }}</a-button>
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { ref, watch } from 'vue'
import { getall } from '@/api/homework.js'
import { homeworkColumns as columns } from '@/utils/staticdata.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  userType: Number,
  username: String,
  classID: Number | null,
})
const homeworkList = ref([])

const answer = (id) => {
  router.push({
    name: 'answer',
    params: { homeworkID: id, username: props.username },
  })
}

const init = async () => {
  if (!props.classID) return
  const res = await getall({ classID: props.classID, username: props.username })
  if (res.Code === 0) {
    homeworkList.value = res.data
  }
}

watch(() => props.classID, init, { immediate: true })
</script>
