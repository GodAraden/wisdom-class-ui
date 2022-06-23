<template>
  <div v-if="userType === 0" class="funcBar">
    <a-button type="primary">新增通知</a-button>
    <a-button>修改选中通知</a-button>
    <a-button danger type="primary">删除选中通知</a-button>
  </div>
  <a-table
    :row-selection="rowSelection"
    :columns="columns"
    :data-source="data"
    :pagination="{ pageSize: 10 }"
    :scroll="{ y: userType === 0 ? '58vh' : '66vh' }"
  />
</template>

<script setup>
import { computed, ref, unref } from 'vue'
import { Table } from 'ant-design-vue'
import { noticeColumns as columns } from '@/utils/staticdata.js'
const props = defineProps({
  userType: Number,
  username: String,
  classID: Number | null,
})

const data = []

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  })
}

const selectedRowKeys = ref([]) // Check here to configure the default column

const onSelectChange = (changableRowKeys) => {
  console.log('selectedRowKeys changed: ', changableRowKeys)
  selectedRowKeys.value = changableRowKeys
}

const rowSelection = computed(() => {
  return {
    selectedRowKeys: unref(selectedRowKeys),
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  }
})
</script>

<style lang="less" scoped>
.funcBar {
  text-align: right;
  > * {
    margin: 10px 0.6vw;
  }
}
</style>
