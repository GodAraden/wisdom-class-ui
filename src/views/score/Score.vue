<template>
  <a-table
    class="data-view"
    :columns="columns"
    :data-source="data"
    :pagination="false"
    :scroll="{ y: '67.6vh' }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'operation'">
        <a-popconfirm
          title="确认要删除该科目吗?"
          @confirm="deleteSubject(record.id)"
        >
          <a-button shape="round" type="text" danger>删除科目</a-button>
        </a-popconfirm>
        <a-button shape="round" @click="openChangeModal(record)"
          >修改科目信息</a-button
        >
        <a-button
          shape="round"
          type="primary"
          ghost
          @click="jumpPage('score-manage', record.id)"
          >成绩管理</a-button
        >
        <a-button
          shape="round"
          type="primary"
          @click="jumpPage('score-analyze', record.id)"
          >成绩分析</a-button
        >
      </template>
    </template>
  </a-table>
  <div class="funcbar">
    <a-button type="primary" @click="openAddModal">添加科目信息</a-button>
    <a-pagination
      :total="total"
      :pageSize="10"
      showQuickJumper
      @change="init"
    />
  </div>
  <a-modal
    v-model:visible="visible"
    :title="!subject.id ? '添加一个科目' : '修改科目'"
    @ok="handleOk"
    @cancel="handleCancel"
    width="39.2vw"
  >
    <a-input v-model:value="subject.name" placeholder="在这里输入科目名称" />
    考试日期：
    <a-date-picker
      v-model:value="subject.date"
      placeholder="选择考试日期"
      style="margin-top: 9px"
    />
  </a-modal>
</template>

<script setup>
import { subjectColumns as columns } from '@/utils/staticdata.js'
import { ref, watch } from 'vue'
import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject as apiDeleteSubject,
} from '@/api/score.js'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const props = defineProps({
  userType: Number,
  username: String,
  classID: Number | null,
})

const router = useRouter()
const data = ref([])
const total = ref(1)
const subject = ref({})
const visible = ref(false)

const handleCancel = () => {
  visible.value = false
  subject.value = {}
}
const handleOk = () => {
  handleSubject()
  handleCancel()
}
const openAddModal = () => {
  subject.value.method = 'add'
  visible.value = true
}
const openChangeModal = async (record) => {
  subject.value.method = 'update'
  visible.value = true
  subject.value.id = record.id
  subject.value.name = record.name
  subject.value.date = dayjs(record.date, 'YYYY-MM-DD')
}

const handleSubject = async () => {
  let res = null
  if (!subject.value.name || !subject.value.date) {
    message.warn('名称或日期不能为空')
    return
  }
  if (subject.value.method === 'add') {
    res = await addSubject({
      name: subject.value.name,
      date: subject.value.date.format('YYYY-MM-DD'),
      class_id: props.classID,
      id: null,
    })
  } else if (subject.value.method === 'update') {
    res = await updateSubject({
      name: subject.value.name,
      date: subject.value.date.format('YYYY-MM-DD'),
      id: subject.value.id,
    })
  }
  if (res.Code === 0) {
    message.success(res.data)
    handleCancel()
    init()
  }
}
const deleteSubject = async (id) => {
  const res = await apiDeleteSubject({ id })
  if (res.Code === 0) {
    message.success(res.data)
    init()
  }
}
const jumpPage = (to, id) => {
  router.push({ name: to, params: { subjectID: id } })
}

const init = async (page = 1) => {
  if (!props.classID) return
  const res = await getSubjects({
    class_id: props.classID,
    currentPage: page,
  })
  data.value = res.data.data
  total.value = res.data.count
}
watch(() => props.classID, init, { immediate: true })
</script>

<style lang="less" scoped>
.data-view button {
  margin-right: 16px;
}
</style>
