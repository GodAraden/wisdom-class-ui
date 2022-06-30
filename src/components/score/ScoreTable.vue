<template>
  <a-table
    class="data-view"
    :columns="columns"
    :data-source="dataSource"
    :pagination="false"
    size="small"
  >
  </a-table>
  <div class="funcbar">
    <div class="btn-list">
      <a-button shape="round" @click="downloadExcel">
        <file-excel-outlined /> 导出为Excel</a-button
      >
      <a-button shape="round" type="primary" ghost @click="fileUpload">
        <upload-outlined />从Excel导入
      </a-button>
      <a-button shape="round" type="primary" @click="commitChange"
        ><save-outlined />提交更改</a-button
      >
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { scoreColumns as columns } from '@/utils/staticdata.js'
import { uploadFile, fileDownload } from '@/utils/tools.js'
import { getScore, syncScore, download } from '@/api/score.js'
import { message } from 'ant-design-vue'

const props = defineProps({ subjectID: Number })
const dataSource = ref([])

const downloadExcel = async () => {
  const res = await download({ id: props.subjectID })
  fileDownload(res)
}
const fileUpload = () => {
  uploadFile(dataSource)
}
const commitChange = async () => {
  const res = await syncScore({ data: dataSource.value, id: props.subjectID })
  if (res.Code === 0) {
    message.success(res.data)
    init()
  }
}
const init = async () => {
  if (!props.subjectID) return
  const res = await getScore({ id: props.subjectID })
  dataSource.value = res.data
}

watch(() => props.subjectID, init, { immediate: true })
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
