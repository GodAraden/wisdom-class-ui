<template>
  <a-descriptions bordered>
    <a-descriptions-item
      v-for="item in data"
      :key="item.name"
      :label="item.name"
    >
      {{ item.score }}
    </a-descriptions-item>
  </a-descriptions>
</template>
<script setup>
import { ref, watch } from 'vue'
import { individual } from '@/api/score.js'

const props = defineProps({
  userType: Number,
  username: String,
  classID: Number,
})

const data = ref([])
const init = async () => {
  if (!props.username) return
  const res = await individual({ username: props.username })
  if (res.Code === 0) {
    data.value = res.data
  }
}

watch(() => props.username, init, { immediate: true })
</script>
