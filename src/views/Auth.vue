<template>
  <div class="auth-bg">
    <a-page-header title="个人信息修改" @back="back">
      <template #extra>
        <a-button @click="back">取消</a-button>
        <a-button @click="save" type="primary">保存</a-button>
      </template>
    </a-page-header>
    <a-descriptions
      bordered
      class="form-container"
      :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
    >
      <a-descriptions-item
        v-for="item in formState"
        class="form-item"
        :key="item"
        :label="englishToChinese(item.key)"
      >
        <div class="form-item">
          <div class="input">
            <template v-if="item.key === 'username'">
              {{ item.value }} <br /><a>换绑手机？</a>
            </template>
            <template v-else-if="item.key === 'user_type'">
              {{ getPermName(item.value) }}
            </template>
            <template v-else-if="item.key === 'sex'">
              <a-select v-model:value="item.value" style="width: 60px">
                <a-select-option value="男">男</a-select-option>
                <a-select-option value="女">女</a-select-option>
              </a-select>
            </template>
            <template v-else-if="item.key === 'birthday'">
              <a-date-picker v-model:value="item.value" />
            </template>
            <a-input v-else v-model:value="item.value"></a-input>
          </div>
        </div>
      </a-descriptions-item>
      <a-descriptions-item label="密码">
        ******** &nbsp;<a>修改密码？</a>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { whoAmI as apiWhoAmI, changeInfo as apiChangeInfo } from '@/api/user.js'
import { getPermName, englishToChinese } from '@/utils/tools.js'
import { ref } from '@vue/reactivity'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

const router = useRouter()
const formState = ref([])
const back = () => {
  router.push('/main')
}
const save = async () => {
  let t = {}
  for (const k of formState.value) {
    t[k.key] = k.value
  }
  if (t.birthday) t.birthday = t.birthday.format('YYYY-MM-DD')
  const res = await apiChangeInfo(t)
  message.success(res.data)
  back()
}
const whoAmI = async () => {
  const res = await apiWhoAmI()
  if (res.Code === 0) {
    for (const k in res.data) {
      if (k === 'birthday' && res.data[k] !== null)
        formState.value.push({
          key: k,
          value: dayjs(res.data[k], 'YYYY-MM-DD'),
        })
      else
        formState.value.push({
          key: k,
          value: res.data[k],
        })
    }
  }
}
whoAmI()
</script>

<style lang="less">
.auth-bg {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: no-repeat
    url('https://img0.baidu.com/it/u=3893499435,4043894321&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500');
  background-size: 100% 100%;
  background-attachment: fixed;
  .ant-page-header {
    background-color: rgba(255, 255, 255, 0.96);
    border-bottom: 1px solid #f0f0f0;
  }
  .form-container {
    width: 61.8vw;
    height: 80vh;
    margin: 0 auto;
    padding: 2vh 0;
    background-color: rgba(255, 255, 255, 0.7);
    .form-item {
      > .label {
        text-align: right;
        padding: 12px;
      }
      > .input {
        padding: 12px;
      }
      a {
        font-size: 12px;
        user-select: none;
      }
    }
  }
}
</style>
