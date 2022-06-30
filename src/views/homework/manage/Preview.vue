<template>
  <div class="my-container-questionnaire">
    <div class="question-container">
      <a-row>
        <a-col :span="layout.offset"></a-col>
        <a-col :span="layout.width">
          <h1 style="text-align: center">{{ title }}</h1>
        </a-col>
      </a-row>
    </div>
    <div
      v-for="(question, index) in questionnaire"
      :key="question.index"
      class="question-container"
    >
      <a-row>
        <a-col :span="layout.offset"></a-col>
        <a-col :span="layout.width"
          ><h3>{{ index + 1 }}.{{ getFullTitle(question) }}</h3></a-col
        >
      </a-row>
      <a-row>
        <a-col :span="layout.offset"></a-col>
        <a-col :span="layout.width">
          <template v-if="question.type === 1">
            <a-radio-group v-model:value="question.value">
              <a-radio
                v-for="item in question.options"
                :key="item.label"
                :value="item.label"
              >
                {{ item.label }}
              </a-radio>
            </a-radio-group>
          </template>
          <template v-else-if="question.type === 2">
            <a-checkbox-group
              v-model:value="question.value"
              :options="question.options.map((v) => v.label)"
            />
          </template>
          <template v-else-if="question.type === 3">
            <a-select v-model:value="question.value" style="width: 60%">
              <a-select-option
                v-for="item in question.options"
                :key="item.label"
                :value="item.label"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </template>
          <template v-else-if="question.type === 4">
            <a-input
              v-model:value="question.value"
              :placeholder="question.placeholder"
            />
          </template>
          <template v-else-if="question.type === 5">
            <a-textarea
              v-model:value="question.value"
              :placeholder="question.placeholder"
              :rows="4"
            />
          </template>
          <template v-else-if="question.type === 6">
            <a-upload
              v-model:file-list="question.value"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              <a-button>
                <upload-outlined></upload-outlined>
                Click to Upload
              </a-button>
            </a-upload>
          </template>
        </a-col>
      </a-row>
    </div>
    <div class="question-container">
      <a-row>
        <a-col :span="4"></a-col>
        <a-col :span="layout.width">
          <a-button
            type="primary"
            style="width: 100%"
            @click="submit"
            :disabled="!username"
          >
            {{ username ? '提交' : '预览状态下，不可提交' }}
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
import { getone, answer } from '@/api/homework.js'
import { getFullTitle } from '@/utils/homework.js'
import { message } from 'ant-design-vue'
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'

const layout = {
  offset: 4,
  width: 16,
}
const router = useRouter()
const props = defineProps({
  username: String,
  homeworkID: Number,
})
const questionnaire = ref([])
const title = ref('')

const submit = async () => {
  if (
    questionnaire.value.some(
      (v) => v.required && (!v.value || v.value.length === 0)
    )
  ) {
    message.warn('还有必填项没有完成')
    return
  }
  const result = questionnaire.value.map((v) => ({
    key: v.key,
    value: v.value,
  }))
  const res = await answer({
    id: parseInt(props.homeworkID),
    username: props.username,
    answer: result,
  })
  if (res.Code === 0) {
    message.success(res.data)
    router.push('/main/my-homework')
  }
}
const init = async () => {
  if (!props.homeworkID) return
  const res = await getone({ id: props.homeworkID })
  questionnaire.value = JSON.parse(res.data.content)
  title.value = res.data.title
}
watch(() => props.homeworkID, init, { immediate: true })
</script>

<style lang="less" scoped>
.question-container {
  margin: 4px 8vh 14px;
}
</style>
