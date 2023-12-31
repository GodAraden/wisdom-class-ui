<template>
  <a-table
    size="middle"
    class="data-view"
    :columns="columns"
    :data-source="data"
    :rowSelection="
      userType === 0
        ? {
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
            getCheckboxProps: (record) => ({
              disabled: record.creator_id !== username,
            }),
          }
        : null
    "
    :pagination="false"
    :scroll="{ y: '68vh' }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'title'">
        <a @click="showNotice(record)">{{ record.title }}</a>
      </template>
      <template v-else-if="column.dataIndex === 'last_changed'">
        {{ dayjs(record.last_changed).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
    </template>
  </a-table>
  <div class="funcbar">
    <div v-if="userType === 0" class="btn-list">
      <a-button type="primary" @click="openCreateModal">发布通知</a-button>
      <a-button @click="openChangeModal">修改选中通知</a-button>
      <a-popconfirm
        :title="`你确定要删除这 ${selectedRowKeys.length} 条通知吗`"
        placement="bottomRight"
        @confirm="deleteNotice"
      >
        <a-button danger type="primary">删除选中通知</a-button>
      </a-popconfirm>
    </div>
    <a-pagination
      :total="total"
      :pageSize="10"
      showQuickJumper
      @change="init"
    />
  </div>
  <a-modal
    v-model:visible="visible"
    :title="notice.id === -1 ? '发布一条通知' : '修改通知'"
    @ok="handleOk"
    @cancel="handleCancel"
    width="61.8vw"
  >
    <a-input v-model:value="notice.title" placeholder="在这里输入通知标题" />
    <a-textarea
      v-model:value="notice.content"
      placeholder="在这里输入通知正文"
      style="margin-top: 9px"
      :rows="12"
    />
  </a-modal>
  <a-modal
    v-model:visible="noticeVisible"
    :title="notice.title"
    @ok="handleCancel"
    @cancel="handleCancel"
    width="50.8vw"
  >
    <p
      style="max-height: 40vh; overflow-y: scroll"
      v-html="formatTextToHtml(notice.content)"
    ></p>
    <p style="text-align: right">
      ---- {{ notice.creator }}<br />
      {{ dayjs(notice.last_changed).format('YYYY-MM-DD HH:mm:ss') }}
    </p>
  </a-modal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { noticeColumns as columns } from '@/utils/staticdata.js'
import { formatTextToHtml } from '@/utils/tools.js'
import {
  createNotice as apiCreateNotice,
  getNotice as apiGetNotice,
  changeNotice as apiChangeNotice,
  deleteNotice as apiDeleteNotice,
} from '@/api/notice.js'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const props = defineProps({
  userType: Number,
  username: String,
  classID: Number | null,
})

const data = ref([])
const selectedRowKeys = ref([])
const visible = ref(false)
const noticeVisible = ref(false)
const method = ref('')
const notice = ref({})
const total = ref(1)

const handleOk = () => {
  handleNotice()
  handleCancel()
  selectedRowKeys.value = []
}
const handleCancel = () => {
  visible.value = false
  noticeVisible.value = false
  method.value = ''
  notice.value = {}
}
const onSelectChange = (newSelectedRowKeys) => {
  selectedRowKeys.value = newSelectedRowKeys
}

const handleNotice = async () => {
  let res = null
  if (method.value === 'create') {
    if (!notice.value.title || !notice.value.content) {
      message.warn('标题或内容不能为空')
      return
    }
    res = await apiCreateNotice({
      creator: props.username,
      class_id: props.classID,
      title: notice.value.title,
      content: notice.value.content,
    })
  } else if (method.value === 'change') {
    res = await apiChangeNotice({
      id: notice.value.id,
      user: props.username,
      title: notice.value.title,
      content: notice.value.content,
    })
  }
  if (res?.Code === 0) {
    message.success(res.data)
    notice.value.title = ''
    notice.value.content = ''
    init()
  }
}

const deleteNotice = async () => {
  if (!selectedRowKeys.value.length) {
    message.warn('请选择至少一条通知进行删除操作')
    return
  }
  const res = await apiDeleteNotice({
    ids: selectedRowKeys.value,
    user: props.username,
  })
  message.success(res.data)
  init()
}

const openCreateModal = () => {
  method.value = 'create'
  visible.value = true
}

const openChangeModal = () => {
  if (selectedRowKeys.value.length !== 1) {
    message.warn('请选择唯一的一条通知进行修改')
    return
  }
  const t = data.value.filter((v) => v.key === selectedRowKeys.value[0])[0]
  if (t.creator_id !== props.username) {
    message.warn('您不是此条通知的发布者，没有权限修改')
    return
  }
  notice.value.title = t.title
  notice.value.content = t.content
  notice.value.id = t.key
  method.value = 'change'
  visible.value = true
}

const showNotice = (record) => {
  notice.value = record
  noticeVisible.value = true
}

const init = async (page = 1) => {
  if (!props.classID) return
  const res = await apiGetNotice({
    class_id: props.classID,
    currentPage: page,
  })
  if (res.Code === 0) {
    data.value = res.data.data
    total.value = res.data.count
  }
}

watch(() => props.classID, init, { immediate: true })
</script>
