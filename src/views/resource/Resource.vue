<template>
  <a-list
    item-layout="horizontal"
    :data-source="list"
    size="small"
    style="padding: 0 16px"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a download @click="download(item.file_id)">下载</a>
          <a-popconfirm
            v-if="userType === 0"
            title="Are you sure delete this task?"
            placement="rightBottom"
            @confirm="deleteResource(item)"
          >
            <a>删除</a>
          </a-popconfirm>
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a>{{ item.name }}</a>
          </template>
        </a-list-item-meta>
        <div>上传者：{{ item.uploader }} &nbsp;</div>
        <div>大小：{{ bitChange(item.size) }}</div>
      </a-list-item>
    </template>
  </a-list>
  <a-button
    v-if="userType === 0"
    type="primary"
    style="margin-left: 10px"
    @click="visible = true"
    ><upload-outlined /> 上传资源</a-button
  >
  <a-pagination
    style="float: right"
    :total="count"
    :pageSize="8"
    :showSizeChanger="false"
    showQuickJumper
    @change="init"
  />
  <a-modal v-model:visible="visible" title="填写资源信息" @ok="updateResource">
    <pre>仅支持上传单个资源，多个资源请打包成压缩包后上传</pre>
    <a-textarea
      v-model:value="description"
      placeholder="在这里输入资源描述"
      style="margin-top: 9px"
      :rows="4"
    />
    <a-upload-dragger
      style="margin-top: 9px"
      v-model:file-list="fileList"
      :maxCount="1"
      action="http://127.0.0.1:8000/api/v1/resource/upload"
      @change="handleChange"
    >
      <upload-outlined /> 上传资源
    </a-upload-dragger>
  </a-modal>
</template>
<script setup>
import { message } from 'ant-design-vue'
import { ref, watch } from 'vue'
import {
  updateResource as apiUpdateResource,
  getResource,
  deleteResource as apiDeleteResource,
  download as apiDownload,
} from '@/api/resource.js'
import { bitChange, fileDownload } from '@/utils/tools.js'

const props = defineProps({
  userType: Number,
  username: String,
  classID: Number | null,
})

const list = ref([])
const count = ref(1)
const visible = ref(false)
const description = ref('')
const fileList = ref([])
const fileID = ref(-1)

const handleChange = (info) => {
  const status = info.file.status
  if (status === 'done') {
    message.success(`${info.file.name} 文件上传成功`)
    fileID.value = info?.file?.response?.data
  } else if (status === 'error') {
    message.error(`${info.file.name} 文件上传失败`)
  }
}

const updateResource = async () => {
  const res = await apiUpdateResource({
    username: props.username,
    class_id: props.classID,
    file_id: fileID.value,
    description: description.value,
  })
  if (res.Code === 0) {
    message.success(res.data)
    description.value = ''
    fileID.value = ''
    fileList.value = []
    visible.value = false
    init()
  }
}

const deleteResource = async (item) => {
  if (props.username !== item.uploader_id) {
    message.warn('只有资源的发布者才有权限删除资源')
    return
  }
  const res = await apiDeleteResource({
    file_id: item.file_id,
  })
  if (res.Code === 0) {
    message.success(res.data)
    init()
  }
}

const init = async (page = 1) => {
  if (!props.classID) return
  const res = await getResource({
    class_id: props.classID,
    currentPage: page,
  })
  list.value = res.data.data
  count.value = res.data.count
}

const download = async (id) => {
  const res = await apiDownload({ file_id: id })
  fileDownload(res)
}

watch(() => props.classID, init, { immediate: true })
</script>

<style lang="less" scoped>
.demo-loadmore-list {
  min-height: 350px;
  margin: 2px 12px;
}
</style>
