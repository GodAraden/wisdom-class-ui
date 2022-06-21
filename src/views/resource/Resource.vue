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
          <a key="list-loadmore-edit">下载</a>
          <a key="list-loadmore-more">删除</a>
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
  <a-pagination
    style="float: right"
    :total="90"
    :showSizeChanger="false"
    showQuickJumper
  />
</template>
<script setup>
import { onMounted, ref } from 'vue'
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
