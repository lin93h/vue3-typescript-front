<template>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="box-title">vue3-TS-ElementPlus后台管理系统</div>
      <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item label="" prop="username">
          <el-input v-model="loginForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <div class="flex-row-center">
            <el-input v-model="loginForm.code" @keyup.enter.stop="handleLogin" clearable></el-input>
            <img class="graphic-code" :src="codeImg" @click="handleGetCode" />
          </div>
        </el-form-item>
      </el-form>
      <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent } from 'vue'
import { captchaImage } from '@/api/common'
import { login } from '@/api/user'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'Login',
  data() {
    const checkAccount = (
      rule: Record<string, unknown>,
      value: string,
      callback: Function
    ) => {
      if (!value) {
        callback(new Error('不可少于4个字符'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: checkAccount, trigger: 'blur' }
        ],
        passowrd: [{ required: true, message: '请输入', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      codeImg: ''
    }
  },
  computed: {
    ...mapGetters('user', ['token', 'roles', 'userInfo'])
  },
  created() {
    this.handleGetCode()
  },
  methods: {
    ...mapActions('user', ['setToken', 'getUser']),
    // 获取验证码
    handleGetCode() {
      captchaImage()
        .then((res) => {
          this.codeImg = res.img as string
          this.loginForm.uuid = res.uuid
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // 登录
    handleLogin() {
      const loginFormRef = this.$refs['loginFormRef'] as InstanceType<
        typeof ElForm
      >
      loginFormRef.validate((valid) => {
        if (valid) {
          login(this.loginForm)
            .then((res) => {
              this.setToken(res.token).then(() => {
                this.$router.push('/loan')
              })
            })
            .catch(() => {
              this.handleGetCode()
            })
        }
      })
    }
  }
})
</script>

<style lang="scss">
.login-wrapper {
  height: 100vh;
  overflow: hidden;
  background: url(../../assets/images/login-bg.jpg) no-repeat #002766;
  background-size: cover;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  .login-box {
    background: #fff;
    padding: 50px;
    border-radius: 5px;
    .box-title {
      text-align: center;
      margin-bottom: 20px;
      font-weight: bold;
    }
    .login-form {
      margin-bottom: 30px;
    }
    .graphic-code {
      flex-shrink: 0;
      height: 40px;
      width: 84px;
      overflow: hidden;
      cursor: pointer;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
