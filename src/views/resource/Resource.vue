<template>
  <a-list
    class="demo-loadmore-list"
    :loading="initLoading"
    item-layout="horizontal"
    :data-source="list"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a>下载</a>
          <a v-if="userType === 0">删除</a>
        </template>
        <a-skeleton avatar :title="false" :loading="!!item.loading" active>
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <template #title>
              <a href="https://www.antdv.com/">{{ item.name.last }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item.picture.large" />
            </template>
          </a-list-item-meta>
          <div>123MB</div>
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
  <a-button v-if="userType === 0" type="primary" style="margin-left: 10px"
    >上传资源</a-button
  >
  <a-pagination
    style="float: right"
    :total="90"
    :showSizeChanger="false"
    showQuickJumper
  />
</template>
<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
  userType: Number,
  username: String,
  classID: Number | null,
})

const count = 7
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`

const initLoading = ref(true)
const loading = ref(false)
const data = ref([])
const list = ref([])
onMounted(() => {
  fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      initLoading.value = false
      data.value = res.results
      list.value = res.results
    })
})
</script>

<style lang="less" scoped>
.demo-loadmore-list {
  min-height: 350px;
  margin: 2px 12px;
}
</style>
