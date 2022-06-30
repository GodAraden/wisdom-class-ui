<template>
  <a-page-header
    :title="
      names.subjectName + (manage === 'manage' ? ' 成绩管理' : ' 成绩分析')
    "
    :subTitle="'for ' + names.className"
    @back="router.push('score')"
  >
  </a-page-header>
  <score-table v-if="manage === 'manage'" :subjectID="subjectID"></score-table>
  <analyze v-else-if="manage === 'analyze'" :subjectID="subjectID"></analyze>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getName as apiGetName } from '@/api/score.js'
import ScoreTable from '@/components/score/ScoreTable.vue'
import Analyze from '@/components/score/Analyze.vue'

const router = useRouter()
const props = defineProps({
  userType: Number,
  username: String,
  classID: Number,
  subjectID: String,
})

const subjectID = ref(0)
const names = ref({})
const manage = router.currentRoute.value.name.split('-')[1]

const getName = async () => {
  if (!props.subjectID) return
  const res = await apiGetName({ id: props.subjectID })
  if (res.Code === 0) {
    names.value = res.data
    subjectID.value = parseInt(props.subjectID)
  }
}

watch(
  () => props.classID,
  () => router.push('score')
)
watch(() => props.subjectID, getName, { immediate: true })
</script>
