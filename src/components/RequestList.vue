<template>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item, index }">
      <a-list-item>
        <template #actions>
          <template v-if="!item.status">
            <a-button
              type="primary"
              ghost
              shape="round"
              @click="manage(index, 1)"
              >通过</a-button
            >
            <a-button shape="round" @click="manage(index, 2)" danger
              >拒绝</a-button
            >
          </template>
          <a-button v-else disabled shape="round">{{
            item.status === 1 ? '已通过' : '已拒绝'
          }}</a-button>
        </template>
        <a-list-item-meta :description="item.class">
          <template #title>
            {{ item.name }}（{{ item.username }}） 想要加入
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
<script setup>
import { manageRequest } from '@/api/class.js'
import { ref } from '@vue/reactivity'
import { message } from 'ant-design-vue'
const props = defineProps({
  data: Array,
})
const data = ref(props.data)
const manage = async (index, status) => {
  console.log({
    status: status,
    request: props.data[index].username,
    class: props.data[index].class,
  })
  const res = await manageRequest({
    status: status,
    request: props.data[index].username,
    class: props.data[index].class,
  })
  if (res.Code === 0) {
    message.success(res.data)
    data.value = data.value.filter((v, i, a) => {
      if (i === index) v.status = status
      return true
    })
  }
}
</script>
<style scoped>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
