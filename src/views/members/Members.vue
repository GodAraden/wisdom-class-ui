<template>
  <a-table
    :data-source="dataSource"
    :columns="columns"
    :pagination="false"
    class="data-view"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.dataIndex === 'operation'">
        <a-popconfirm v-if="dataSource.length" title="Sure to delete?">
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <div class="funcbar">
    <div class="btn-list">
      <a-button
        class="func-btn"
        type="primary"
        shape="round"
        @click="() => (visible = true)"
        >邀请成员</a-button
      >
      <a-button
        class="func-btn"
        shape="round"
        @click="() => (req_visible = true)"
        >申请列表{{
          req_list.length === 0 ? '' : ` (${req_list.length})`
        }}</a-button
      >
    </div>
    <a-pagination
      :total="count"
      :pageSize="10"
      :showSizeChanger="false"
      showQuickJumper
      @change="initWithoutNotice"
    />
  </div>
  <a-modal
    v-model:visible="visible"
    title="根据手机号码搜索对应用户"
    width="61.8vw"
    @ok="handleOk"
    @cancel="handleOk"
  >
    <a-input-search v-if="visible" enter-button @search="onSearch" />
    <a-table
      size="small"
      :data-source="searchResult"
      :columns="columns"
      :scroll="{ y: '28vh' }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-button v-if="record.status === -1" disabled>已邀请</a-button>
          <a-button v-else-if="record.status === 0" disabled>已申请</a-button>
          <a-button v-else-if="record.status === 2" danger>已拒绝</a-button>
          <a-button v-else @click="inviteMember(record)">邀请</a-button>
        </template>
      </template>
    </a-table>
  </a-modal>
  <a-drawer
    :title="'申请列表' + (req_list.length === 0 ? '' : ` (${req_list.length})`)"
    size="large"
    :visible="req_visible"
    @close="closeDrawer"
  >
    <request-list :data="req_list"></request-list>
  </a-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  findClassMember,
  searchMember,
  getRequest as apiGetRequest,
  sendRequest as apiSendRequest,
} from '@/api/class.js'
import { getPermName } from '@/utils/tools.js'
import { memberColumns as columns } from '@/utils/staticdata.js'
import { message, notification } from 'ant-design-vue'
import RequestList from '@/components/RequestList.vue'

const props = defineProps({
  userType: Number,
  username: String,
  classID: Number | null,
})

const dataSource = ref([])
const searchResult = ref([])
const req_list = ref([])
const visible = ref(false)
const req_visible = ref(false)
const count = ref(1)

const onSearch = async (searchValue) => {
  if (!searchValue) {
    message.warn('搜索内容不能为空')
    return
  }
  searchResult.value = []
  const res = await searchMember({
    phone: searchValue,
    class_id: props.classID,
  })
  if (res.Code === 0) {
    res.data.forEach((v) => {
      v.user_type = getPermName(v.user_type)
    })
    searchResult.value = res.data
  }
}
const handleOk = (e) => {
  visible.value = false
  searchResult.value = []
}
const inviteMember = async (record) => {
  const res = await apiSendRequest({
    class_id: props.classID,
    username: record.phone,
    creator: props.username,
    method: -1,
  })
  if (res.Code === 0) {
    message.success(res.data)
    record.status = -1
  }
}
const closeDrawer = () => {
  req_visible.value = false
  initWithoutNotice(1)
}

const getClassMember = async (currentPage) => {
  const res = await findClassMember({
    class_id: props.classID,
    currentPage: currentPage,
  })
  count.value = res.data.count
  dataSource.value = res.data.data
  dataSource.value.forEach((v) => {
    v.user_type = getPermName(v.user_type)
  })
}
const getRequests = async (notice) => {
  const req = await apiGetRequest({
    username: props.username,
    type: 0,
  })
  if (req.data.length && notice === true) {
    notification.open({
      message: `有 ${req.data.length} 条加入班级请求待处理`,
      description: '在成员管理 → 申请列表中处理这些请求',
      placement: 'bottomRight',
    })
    req_list.value = req.data
  }
}

const initWithoutNotice = (currentPage) => {
  if (!props.classID) return
  getClassMember(currentPage)
  getRequests(false)
}

const init = () => {
  if (!props.classID) return
  getClassMember(1)
  getRequests(true)
}

watch(() => props.classID, init, { immediate: true })
</script>
