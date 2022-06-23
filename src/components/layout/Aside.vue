<template>
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
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { PieChartOutlined } from '@ant-design/icons-vue'
import { watch } from '@vue/runtime-core'

const props = defineProps({
  userType: Number,
})
const router = useRouter()
const options = ref([])
const selectedKeys = ref([])

const init = async () => {
  options.value = []
  for (const k of router.options.routes) {
    if (k.path === '/main') {
      for (const child of k.children) {
        if (child.path !== '') {
          if (child.permission == props.userType || child.permission == -1)
            options.value.push(child)
        }
      }
    }
  }
  selectedKeys.value[0] = options.value[0].path
  router.push(selectedKeys.value[0])
}
const select = ({ key }) => {
  router.push(key)
}
watch(() => props.userType, init)
</script>

<style lang="less">
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
</style>
