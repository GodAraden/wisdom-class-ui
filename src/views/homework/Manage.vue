<template>
  <a-page-header
    :title="router.currentRoute.value.name"
    @back="() => router.push('/main/homework')"
  >
    <template v-if="path === 'new-homework'" #extra>
      <a-button type="primary" @click="visible = true">发布</a-button>
    </template>
    <template v-else #extra>
      <a-select
        v-model:value="homeworkID"
        style="width: 240px"
        placeholder="您的班级还没有发布作业"
      >
        <a-select-option
          v-for="item in homeworkList"
          :key="item.id"
          :value="item.id"
          >{{ item.title }}</a-select-option
        >
      </a-select>
    </template>
  </a-page-header>
  <new
    v-if="path === 'new-homework'"
    v-model:questionnaire="questionnaire"
  ></new>
  <preview
    v-else-if="path === 'preview-homework'"
    :homeworkID="parseInt(homeworkID)"
  ></preview>
  <result
    v-else-if="path === 'homework-result'"
    :homeworkID="parseInt(homeworkID)"
  ></result>
  <a-modal v-model:visible="visible" title="请填写作业标题" @ok="create">
    <a-input v-model:value="title"></a-input>
  </a-modal>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import New from '@/views/homework/manage/New.vue'
import Preview from '@/views/homework/manage/Preview.vue'
import Result from '@/views/homework/manage/Result.vue'
import { create as apiCreate, getall } from '@/api/homework.js'
import { message } from 'ant-design-vue'

const router = useRouter()
const props = defineProps({
  userType: Number,
  username: String,
  classID: Number | null,
})

const path = router.currentRoute.value.path.split('/')[2]
const homeworkID = ref(null)
const homeworkList = ref([])
const questionnaire = ref([])
const visible = ref(false)
const title = ref('')

const create = async () => {
  if (!title.value) {
    message.warn('请填写作业标题')
    return
  }
  const res = await apiCreate({
    questionnaire: questionnaire.value,
    title: title.value,
    classID: props.classID,
    creator: props.username,
  })
  if (res.Code === 0) {
    message.success(res.data)
    visible.value = false
    router.push('/main/homework')
  }
}

const init = async () => {
  if (!props.classID) return
  if (path !== 'new-homework') {
    const res = await getall({ classID: props.classID })
    if (res.Code === 0) {
      homeworkList.value = res.data
      if (res.data[0]) homeworkID.value = res.data[0].id
    }
  }
}

watch(() => props.classID, init, { immediate: true })
</script>

<style lang="less">
.ant-page-header {
  border-bottom: 2px solid #fafafa;
}
div[class^='my-container-'] {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>
