<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="login-welcome">
        <h1>Welcome<br />WisdomClass智慧班级</h1>
      </div>
      <div class="form-bg">
        <div class="form-container">
          <a-menu
            class="form-item"
            v-model:selectedKeys="current"
            mode="horizontal"
          >
            <a-menu-item key="login"> 登录 </a-menu-item>
            <a-menu-item key="register"> 注册 </a-menu-item>
          </a-menu>
          <a-input
            :class="`form-item ${error.phone ? 'input-error' : 'input'}`"
            size="large"
            v-model:value="formState.phone"
            :bordered="false"
            placeholder="请输入你的手机号"
          >
            <template #prefix>
              <phone-outlined class="icon" />
            </template>
          </a-input>
          <a-input-password
            :class="`form-item ${error.password ? 'input-error' : 'input'}`"
            size="large"
            v-model:value="formState.password"
            :bordered="false"
            placeholder="请输入你的密码"
          >
            <template #prefix>
              <key-outlined class="icon" />
            </template>
          </a-input-password>
          <div class="form-item" v-if="current[0] === 'login'">
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          </div>
          <template v-else>
            <a-input-password
              :class="`form-item ${error.confirmPwd ? 'input-error' : 'input'}`"
              size="large"
              v-model:value="formState.confirmPwd"
              :bordered="false"
              placeholder="请确认你的密码"
            >
              <template #prefix>
                <key-outlined class="icon" />
              </template>
            </a-input-password>
            <div class="confirm-number-bar form-item">
              <a-input
                :class="error.confirmNum ? 'input-error' : 'input'"
                size="large"
                v-model:value="formState.confirmNum"
                :bordered="false"
                placeholder="请输入验证码"
              >
                <template #prefix>
                  <comment-outlined class="icon" />
                </template>
              </a-input>
              <a-button
                class="input"
                type="text"
                size="large"
                :disabled="confirmBtnDisabled"
                @click="sendConfirmNumber"
                >{{ confirmText }}</a-button
              >
            </div>
          </template>
          <a-button
            class="form-item"
            type="primary"
            shape="round"
            size="large"
            block
            @click="user"
            >立即{{ current[0] === 'login' ? '登录' : '注册' }}</a-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { register as apiRegister, login as apiLogin } from '@/api/user.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const current = ref(['login'])
const confirmBtnDisabled = ref(false) // 发送验证码按钮是否禁用
const confirmText = ref('获取验证码') // 发送验证码按钮文本
const formState = reactive({
  phone: '',
  password: '',
  confirmPwd: '',
  confirmNum: '',
  remember: false,
}) // 表单数据
const error = reactive({
  phone: false,
  password: false,
  confirmPwd: false,
  confirmNum: false,
}) // 表单出错状态
const checkRegs = {
  phone: /^1[3-9]\d{9}/,
  password: /\w{6,20}/,
  confirmPwd: /\n/,
} // 表单校验正则

const checkText = (key, msg) => {
  if (!checkRegs[key]?.test(formState[key])) {
    message.error(msg)
    error[key] = true
    setTimeout(() => {
      error[key] = false
    }, 3000)
    return false
  } else return true
} // 表单校验，若出错则提示
const user = async () => {
  if (!checkText('phone', '请输入正确的手机号码')) return
  if (!checkText('password', '请设置6到20位的密码')) return
  if (current.value[0] === 'register') {
    if (formState.password !== formState.confirmPwd) {
      checkText('confirmPwd', '两次密码输入不匹配，请检查')
      return
    }
    const res = await apiRegister({
      username: formState.phone,
      password: formState.password,
      confirm_number: formState.confirmNum,
    })
    if (res.Code === 0) {
      message.success(res.data + '，即将自动登录')
    } else {
      return
    }
  }
  const res = await apiLogin({
    username: formState.phone,
    password: formState.password,
    remember: formState.remember,
  })
  if (res.Code === 0) {
    message.success(res.data)
    router.push('/main')
  } else {
    return
  }
}

const sendConfirmNumber = async () => {
  if (!checkText('phone', '请输入正确的手机号码')) return
  let time = 60
  confirmBtnDisabled.value = true
  confirmText.value = `余${time}s可再次发送`
  const timer = setInterval(() => {
    if (time > 0) {
      time--
      confirmText.value = `余${time}s可再次发送`
    } else {
      clearInterval(timer)
      confirmBtnDisabled.value = false
      confirmText.value = '获取验证码'
    }
  }, 1000)
}
</script>

<style lang="less" scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: center / contain
    url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fe5%2Fee%2F39%2Fe5ee394171595fe762878968bf537f0c.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658231462&t=7fafca3753567a04c0473b2d841b5f3c')
    no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.login-container {
  display: flex;
  width: 80vw;
  height: 80vh;
  margin: 10vh auto;
  > div {
    flex: 1;
    h1 {
      position: relative;
      top: 20vh;
      text-align: center;
      color: #fff;
      font-size: 36px;
      font-weight: 700;
    }
  }
  > .login-welcome {
    background: rgba(255, 255, 255, 0.4);
  }
  > .form-bg {
    background-color: #fff;
    .form-container {
      padding: 6vh;
      .input {
        border-bottom: 1px solid #f0f0f0;
      }
      .input-error {
        border-bottom: 1px solid rgba(255, 0, 0, 0.496);
      }
      .form-item {
        margin-bottom: 4vh;
        min-height: 2vh;
      }
      .confirm-number-bar {
        display: flex;
      }
    }
  }
}
</style>
