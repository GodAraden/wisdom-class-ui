<template>
  <a-row class="data-view" justify="space-around" align="middle">
    <a-col :span="8" v-for="item in btnGroup" :key="item.path">
      <big-btn @click="routerTo(item.description)">
        <template #icon> <component :is="item.icon()"></component> </template>
        <template #description> {{ item.description }}</template>
      </big-btn>
    </a-col>
  </a-row>
  <div class="funcbar" style="height: 16vh"></div>
</template>

<script setup>
import BigBtn from '@/components/homework/BigBtn.vue'
import { homeworkBtnGroup as btnGroup } from '@/utils/staticdata.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  userType: Number,
  username: String,
  classID: Number | null,
})
const routerTo = (name) => {
  router.push({ name: name })
}
</script>
