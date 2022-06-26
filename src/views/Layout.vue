<template>
  <a-layout class="layout-bg">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <my-aside :userType="parseInt(userInfo.user_type)"></my-aside>
    </a-layout-sider>
    <a-layout>
      <my-header
        :classes="classes"
        :userInfo="userInfo"
        v-model:classID="classID"
        @init="init"
      ></my-header>
      <a-layout-content class="layout-content-bg view-bg">
        <router-view
          :userType="parseInt(userInfo.user_type)"
          :username="userInfo.username"
          :classID="classID"
        ></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import MyHeader from '@/components/layout/Header.vue'
import MyAside from '@/components/layout/Aside.vue'
import { reactive, ref } from 'vue'
import { whoAmI as apiWhoAmI } from '@/api/user.js'
import {
  findClassByUser,
  getRequest as apiGetRequest,
  manageRequest as apiManageRequest,
} from '@/api/class.js'
import { globalNotice } from '@/utils/tools.js'
import { notification, message } from 'ant-design-vue'

const collapsed = ref(false)
const classID = ref(null)
const classes = ref([])
const userInfo = reactive({
  display_name: '',
  username: '',
  user_type: null,
})

const init = async () => {
  const res = await apiWhoAmI()
  userInfo.display_name = res.data.name || res.data.username
  userInfo.username = res.data.username
  userInfo.user_type = res.data.user_type
  const res1 = await findClassByUser({
    user: userInfo.username,
  })
  classes.value = res1.data
  if (classes.value.length) {
    classID.value = classes.value[0].id
  }
  const res2 = await apiGetRequest({
    username: userInfo.username,
    type: -1,
  })
  for (const k of res2.data) {
    globalNotice(k, manageRequest)
  }
}

const manageRequest = async (status, k, key) => {
  const res = await apiManageRequest({
    status,
    request: k.username,
    class_id: k.class_id,
  })
  if (res.Code === 0) {
    message.success(res.data)
    notification.close(key)
    init()
  }
}

init()
</script>

<style lang="less" scoped>
.layout-bg {
  width: 100vw;
  height: 100vh;
  .layout-content-bg {
    margin: 3.2vh;
    background-color: #fff;
    overflow-y: scroll;
  }
}
</style>
