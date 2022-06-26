<template>
  <a-page-header
    :title="names.subjectName + (manage ? ' 成绩管理' : ' 成绩分析')"
    :subTitle="'from' + names.className"
    @back="router.push('score')"
  >
    <template v-if="manage" #extra>
      <a-button shape="round">添加数据</a-button>
      <a-button shape="round" type="primary" ghost>从Excel导入</a-button>
      <a-button shape="round" type="primary">提交更改</a-button>
    </template>
  </a-page-header>
  <score-table v-if="manage" :id="subjectID"></score-table>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getName as apiGetName } from '@/api/score.js'
import ScoreTable from '@/components/score/ScoreTable.vue'

const router = useRouter()
const props = defineProps({
  userType: Number,
  username: String,
  classID: Number,
  subjectID: String,
})

const names = ref({})
const manage =
  router.currentRoute.value.name.split('-')[1] === 'manage' ? true : false

const getName = async () => {
  const res = await apiGetName({ id: props.subjectID })
  if (res.Code === 0) {
    names.value = res.data
  }
}

getName()

watch(
  () => props.classID,
  () => {
    router.push('score')
  }
)
</script>
