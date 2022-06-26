<template>
  <a-layout-header style="background-color: #fff">
    <div style="float: left">
      当前班级：
      <a-select
        v-model:value="classID"
        @change="(v) => emits('update:classID', v)"
        style="width: 200px"
        placeholder="暂时还没有班级哦"
      >
        <a-select-option
          v-for="item in classes"
          :key="item.id"
          :value="item.id"
          >{{ item.name }}</a-select-option
        >
      </a-select>
      <a-button
        v-if="userInfo.user_type === 0"
        type="text"
        @click="() => (newVisible = true)"
        >+ 新建班级</a-button
      >
      <a-button type="text" @click="() => (joinVisible = true)">
        加入班级</a-button
      >
    </div>
    <div style="float: right">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          欢迎！{{ userInfo.display_name }}
          {{ getPermName(userInfo.user_type) }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu @click="funcClick">
            <a-menu-item key="info">个人信息</a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
  <a-modal
    v-model:visible="newVisible"
    title="请输入新建班级名称"
    @ok="newClassOk"
  >
    <a-input v-model:value="className"></a-input>
  </a-modal>
  <a-modal
    v-model:visible="joinVisible"
    title="请输入要加入的班级名称"
    width="61.8vw"
    @ok="joinClassOk"
    @cancel="joinClassOk"
  >
    <a-input-search v-if="joinVisible" enter-button @search="onSearch" />
    <a-table
      size="small"
      :data-source="searchResult"
      :columns="columns"
      :scroll="{ y: '28vh' }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-button v-if="record.status === -1" disabled>已被邀请</a-button>
          <a-button v-if="record.status === 0" disabled>申请中</a-button>
          <a-button v-else-if="record.status === 1" disabled>已加入</a-button>
          <a-button v-else-if="record.status === 2" danger>已被拒绝</a-button>
          <a-button
            v-else-if="record.status === 255"
            @click="sendRequest(record)"
            >申请加入</a-button
          >
        </template>
      </template>
    </a-table>
  </a-modal>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { logout as apiLogout } from '@/api/user.js'
import {
  createClass as apiCreateClass,
  searchClass,
  sendRequest as apiSendRequest,
} from '@/api/class.js'
import { getPermName } from '@/utils/tools.js'
import { classColumns as columns } from '@/utils/staticdata.js'
import { useRouter } from 'vue-router'

const props = defineProps({
  classes: Array,
  userInfo: Object,
  classID: Number,
})
const emits = defineEmits(['update:classID', 'init'])
const router = useRouter()
const className = ref('')
const newVisible = ref(false)
const joinVisible = ref(false)
const searchResult = ref([])

const logout = async () => {
  const res = await apiLogout()
  message.success(res.data)
}
const funcClick = ({ key }) => {
  if (key === 'info') {
    router.push('/auth')
  } else if (key === 'logout') {
    logout()
    router.push('/user')
  }
}
const newClassOk = async (e) => {
  if (!className.value) {
    message.warn('新建班级名称不能为空')
    return
  }
  const res = await apiCreateClass({
    name: className.value,
    creator: props.userInfo.username,
  })
  if (res.Code === 0) {
    message.success(res.data)
    newVisible.value = false
    className.value = ''
    emits('init')
  }
}
const joinClassOk = () => {
  joinVisible.value = false
  searchResult.value = []
}
const onSearch = async (searchValue) => {
  if (!searchValue) {
    message.warn('搜索内容不能为空')
    return
  }
  const res = await searchClass({
    name: searchValue,
    username: props.userInfo.username,
  })
  if (res.Code === 0) {
    searchResult.value = res.data
  }
}
const sendRequest = async (record) => {
  const res = await apiSendRequest({
    class_id: record.id,
    username: props.userInfo.username,
    creator: record.creator_phone,
    method: 0,
  })
  if (res.Code === 0) {
    message.success(res.data)
    record.status = 0
  }
}
</script>
