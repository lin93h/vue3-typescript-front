 <template>
  <div class="app-header">
    <div class="header-wrapper" :class="animate ? 'dark-bg' : ''">
      <div class="header-inner">
        <div class="left-info">
          <router-link class="title-sec" to="/home">
            <img :src="logoImg" alt="logo" class="logo">
            <div class="title-box">
              <div class="sub-title">福建省补贴性职业培训管理平台</div>
              <span class="title">创业担保贷款服务网</span>
            </div>
          </router-link>
        </div>
        <slot>
          <div class="login-box">
            <!-- <div class="msg-box">消息</div>
            <div class="avator-box">
              <el-avatar size="small" :src="avatorImg"></el-avatar>
            </div> -->
            <el-dropdown trigger="click" v-if="token">
              <span class="basic-info">{{name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu>
                <template #dropdown>
                  <div class="login-out-txt" @click="handleLoginOut">退出</div>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="btn-group" v-else>
              <el-button type="primary" size="small" @click="handleLogin">个人登录</el-button>
              <el-button type="primary" size="small" @click="handleLoginOrg">企业登录</el-button>
              <!-- <div class="theme-btn register" @click="handleReg">注册</div> -->
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
    <el-dialog class="login-code-dlg" v-model="visible" @close="handleClose" width="450px" :close-on-click-modal="false" append-to-body>
      <div class="qrcode-wrapper">
        <div class="title">使用微信扫一扫，一键登录</div>
        <el-image style="width: 300px; height: 300px" :src="qrcodeUrl" fit="fit"></el-image>
        <div class="guide-box">
          <div class="main-txt">请使用微信进行扫描二维码</div>
          <div class="txt">1、打开手机微信<img class="icon" :src="wechatImg" alt=""></div>
          <div class="txt">2、点击右上角<img class="icon" :src="iconAddImg" alt="">，再点击扫一扫<img class="icon" :src="saoyisaoImg" alt=""></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import logoImg from '@/assets/images/logo.png';
import avatorImg from '@/assets/images/avator.png';
import wechatImg from '@/assets/images/wechat.png';
import saoyisaoImg from '@/assets/images/sys.jpg';
import iconAddImg from '@/assets/images/icon-add.png';
import QRCode from 'qrcode'
import { mapGetters } from 'vuex';
import { loginCode, checkLogin, mztLogOut } from '@/api/common'

export default {
  data() {
    return {
      logoImg,
      avatorImg,
      wechatImg,
      saoyisaoImg,
      iconAddImg,
      visible: false,
      code: "",
      qrcodeUrl: "",
      timer: null,
      scrollFlag: true,
      scrollTimer: null,
      animate: false, // 背景变化
      id: "",
      domain: "",
      webDomain: ""
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'avatar',
      'userInfo',
      'name',
      'uuid',
      'roles'
    ]),
  },
  created() {
    this.domain = process.env.NODE_ENV == 'development' ? 'http://192.168.250.99:8086' : location.origin
    this.webDomain = location.origin + location.pathname
  },
  mounted() {
    this.handleCheckRoute()
  },
  watch: {
    $route(val) {
      this.handleCheckRoute()
    }
  },
  methods: {
    // 检测路由变化
    handleCheckRoute() {
      if(this.$route.name === 'home') {
        this.animate = false
        window.addEventListener("scroll", this.handleScroll)
      } else {
        this.animate = true
        window.removeEventListener('scroll', this.handleScroll)
      }
    },

    // 页面滚动事件
    handleScroll() {
      if(this.scrollFlag) {
        this.scrollFlag = false
        this.scrollTimer = setTimeout(() => {
          this.scrollFlag = true
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          clearTimeout(this.scrollTimer)
          if(scrollTop > 0) {
            this.animate = true
          } else {
            this.animate = false
          }
        }, 300)
      }
    },

    // 登录
    handleLogin() {
      loginCode().then(res => {
        let arr = res.data.split('/')
        let code = arr[arr.length - 1]
        QRCode.toDataURL(res.data, {
          width: 200,
          errorCorrectionLevel: "L",
          margin: 2
        }, (err, url) => {
          this.qrcodeUrl = url;
          this.visible = true
          checkLogin({ code }).then(res => {
            if(res.token) {
              this.$store.dispatch('user/setTokenInfo', res.token).then(token => {
                this.visible = false
                this.$router.push('/loan/list?kind=1')
              })
            } else {
              this.timer = setInterval(() => {
                checkLogin({ code }).then(res => {
                  if(res.token) {
                    clearInterval(this.timer)
                    this.$store.dispatch('user/setTokenInfo', res.token).then(token => {
                      this.visible = false
                      this.$router.push('/loan/list?kind=1')
                    })
                  }
                })
              }, 3000)
            }
          })
        })
      })
    },

    // 企业登录
    handleLoginOrg() {
      if(!this.token) {
        let timestamp = new Date().getTime()
        let returnUrl = encodeURIComponent(this.webDomain + "#/loading")
        let url = '/check/lnb/mztCheckLogin?id=' + timestamp + "&returnUrl=" + returnUrl
        window.location = this.domain + url
      }
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
      if(this.roles.includes('personRole')) {
        this.$store.dispatch('user/resetToken').then(res => {
          this.$alert('退出登录成功', '退出提示', {
            type: 'warning',
            callback: () => {
              this.$router.replace('/')
            }
          })
        })
      } else {
        this.$store.dispatch('user/resetToken').then(res => {
          this.$message.success('退出登录成功')
          let returnUrl = encodeURIComponent(this.webDomain)
          let url = this.domain + '/check/lnb/mztLogOut?id=' + this.uuid + "&returnUrl=" + returnUrl
          window.location = url
        })
      }
    },
  }
}
</script>

<style lang="scss">
.login-code-dlg {
  .qrcode-wrapper {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding-bottom: 20px;
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .guide-box {
      background: #f6f6f6;
      padding: 20px;
      border-radius: 5px;
      .main-txt {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .txt {
        margin-bottom: 10px;
        font-size: 12px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      }
      .icon {
        display: inline-block;
        margin-left: 5px;
      }
    }
  }
}
.app-header {
  z-index: 9;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;

  .header-wrapper {
    transition: all 0.3s;
    &.dark-bg {
      background: rgba(9, 110, 215, 1);
    }
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
            color: $theme;
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
              color: $theme;
              border-color: $theme;
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