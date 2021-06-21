 <template>
  <div class="app-header">
    <div class="header-wrapper">
      <div class="header-inner">
        <div class="left-info">
          <router-link class="title-sec" to="/home">
            <img :src="logoImg" alt="logo" class="logo">
            <div class="title-box">
              <div class="sub-title">这是一段描述</div>
              <span class="title">门户站点</span>
            </div>
          </router-link>
        </div>
        <slot>
          <div class="login-box">
            <el-dropdown trigger="click" v-if="token">
              <span class="basic-info">{{userInfo.nickname}}<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu>
                <template #dropdown>
                  <div class="login-out-txt" @click="handleLoginOut">退出</div>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="btn-group" v-else>
              <el-button type="primary" size="small" @click="handleLogin">登录</el-button>
              <el-button type="primary" size="small" @click="handleLoginOrg">注册</el-button>
            </div>
          </div>
        </slot>
      </div>
      <ul class="home-nav-bar">
        <router-link class="nav-item" to="/home" tag="li">
          <span class="txt">首页</span>
        </router-link>
        <li class="nav-item" to="/position" tag="li">
          <span class="txt">政策资讯</span>
        </li>
        <li class="nav-item" to="/notice/1" tag="li">
          <span class="txt">地方专区</span>
        </li>
        <li class="nav-item">
          <span class="txt">创业培训</span>
        </li>
        <li class="nav-item" to="/edu" tag="li">
          <span class="txt">一站式服务</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import logoImg from '@/assets/images/logo.png'
import avatorImg from '@/assets/images/avator.png'
import { mapGetters } from 'vuex'

interface HeaderType {
  logoImg: string
  avatorImg: string
  visible: boolean
  code: string
  qrcodeUrl: string
  timer: number
  scrollFlag: boolean
  scrollTimer: number
  id: string
  domain: string
  webDomain: string
}
export default defineComponent({
  data() {
    return {
      logoImg,
      avatorImg,
      visible: false,
      code: '',
      qrcodeUrl: '',
      timer: 0,
      scrollFlag: true,
      scrollTimer: 0,
      id: '',
      domain: '',
      webDomain: ''
    } as HeaderType
  },
  computed: {
    ...mapGetters('user', ['token', 'userInfo', 'roles'])
  },
  mounted() {
    this.handleCheckRoute()
  },
  watch: {
    $route() {
      this.handleCheckRoute()
    }
  },
  methods: {
    // 检测路由变化
    handleCheckRoute() {
      if (this.$route.name === 'home') {
        window.addEventListener('scroll', this.handleScroll)
      } else {
        window.removeEventListener('scroll', this.handleScroll)
      }
    },

    // 页面滚动事件
    handleScroll() {
      if (this.scrollFlag) {
        this.scrollFlag = false
        this.scrollTimer = window.setTimeout(() => {
          this.scrollFlag = true
          clearTimeout(this.scrollTimer)
        }, 300)
      }
    },

    // 登录
    handleLogin() {
      console.log('11111')
    },

    // 企业登录
    handleLoginOrg() {
      console.log('1111111')
    },

    // 清除登录
    handleClose() {
      clearInterval(this.timer)
    },

    // 注册
    handleReg() {
      // this.$router.push('/register')
    },

    // 退出
    handleLoginOut() {
      if (this.roles.includes('personRole')) {
      } else {
      }
    }
  }
})
</script>

<style lang="scss">
.app-header {
  z-index: 9;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(9, 110, 215, 1);
  .header-wrapper {
    transition: all 0.3s;
    .header-inner {
      width: 1184px;
      margin: 0 auto;
      height: 64px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      .left-info {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .title-sec {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          margin-right: 15px;
          cursor: pointer;
          .logo {
            margin-right: 10px;
            width: 34px;
          }
          .sub-title {
            font-size: 12px;
            color: #fff;
            margin-bottom: 2px;
          }
          .title {
            font-size: 18px;
            font-weight: bold;
            color: #fff;
          }
        }
      }
      .login-box {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .msg-box {
          color: #fff;
          font-size: 15px;
          margin-right: 15px;
          transition: all 0.5s;
          cursor: pointer;
          &:hover {
            color: $blue;
          }
        }
        .avator-box {
          width: 30px;
          height: 30px;
          margin-right: 15px;
          border-radius: 15px;
          overflow: hidden;
          .avator {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .basic-info {
          cursor: pointer;
          color: #fff;
          outline: none !important;
        }
        .btn-group {
          .register {
            background: #fff;
            color: #000;
            border-color: #fff;
            margin-left: 5px;
            &:hover {
              color: $blue;
              border-color: $blue;
            }
          }
        }
      }
      .tool-group {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .tool-item {
          margin-right: 20px;
          color: #409eff;
          font-size: 15px;
          cursor: pointer;
        }
        .icon {
          font-size: 20px;
        }
      }
    }
    .home-nav-bar {
      margin: 0;
      height: 48px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      .nav-item {
        height: 100%;
        margin: 0 50px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .txt {
          font-size: 14px;
          color: #fff;
        }
        &.router-link-active {
          position: relative;
          &::after {
            position: absolute;
            left: 0;
            bottom: 0;
            content: '';
            width: 100%;
            height: 3px;
            background: #fff;
          }
        }
        &:hover {
          position: relative;
          &::after {
            position: absolute;
            left: 0;
            bottom: 0;
            content: '';
            width: 100%;
            height: 3px;
            background: #fff;
          }
        }
      }
    }
  }
}
.login-out-txt {
  font-size: 14px;
  text-align: center;
  padding: 5px 30px;
  cursor: pointer;
  &:hover {
    background: rgb(232, 244, 255);
  }
}
</style>