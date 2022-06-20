<template>
  <a-layout class="layout-bg">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        @select="select"
      >
        <a-menu-item v-for="item in options" :key="item.path">
          <pie-chart-outlined />
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header-bg">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            欢迎！{{ userInfo.username }} {{ getPermName(userInfo.user_type) }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu @click="onClick">
              <a-menu-item key="info">个人信息</a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content style="margin: 16px 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  DownOutlined,
} from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { whoAmI as apiWhoAmI, logout as apiLogout } from '@/api/user.js'
import { getPermName } from '@/utils/tools.js'
import { message } from 'ant-design-vue'

const router = useRouter()
const selectedKeys = ref([])
const collapsed = ref(false)
const options = ref([])
const userInfo = reactive({
  username: '',
  user_type: null,
})
const whoAmI = async () => {
  const res = await apiWhoAmI()
  userInfo.username = res.data.username
  userInfo.user_type = res.data.user_type
  for (const k of router.options.routes) {
    if (k.path === '/main') {
      for (const child of k.children) {
        if (child.path !== '') {
          if (child.permission == userInfo.user_type || child.permission == -1)
            options.value.push(child)
        }
      }
    }
  }
  selectedKeys.value[0] = options.value[0].path
}
const logout = async () => {
  const res = await apiLogout()
  message.success(res.data)
}
const onClick = ({ key }) => {
  if (key === 'info') {
  } else if (key === 'logout') {
    logout()
    router.push('/user')
  }
}
const select = ({ key }) => {
  router.push(key)
}

whoAmI()
</script>

<style lang="less" scoped>
.layout-bg {
  width: 100vw;
  height: 100vh;
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  .layout-header-bg {
    background-color: #fff;
    text-align: right;
  }
}
</style>
