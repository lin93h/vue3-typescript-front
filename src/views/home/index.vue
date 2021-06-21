<template>
  <div class="loan-wrapper">
    <div class="banner-sec"></div>
    <div class="entry-sec">
      <div class="entry-item">
        <div class="title">创业贷款资质申请</div>
        <div class="desc">
          <div class="txt">全力支持个人（企业）创业</div>
          <div class="txt">为创业或再创业企业提供融资支持</div>
        </div>
        <div class="btn-box">
          <el-button @click="handleApply(1)" type="primary" size="small" v-if="!token || roles.includes('personRole')">个人申请</el-button>
          <el-button @click="handleApply(2)" type="primary" size="small" v-if="!token || roles.includes('comRole')">企业申请</el-button>
          <el-button size="small">查看政策详情</el-button>
        </div>
      </div>
      <div class="entry-item entry-item2">
        <div class="stat">
          <span class="number">1161.00</span>
          <span class="unit">万</span>
        </div>
        <div class="stat-desc">解决（个人）需求金额</div>
      </div>
      <div class="entry-item entry-item3">
        <div class="stat">
          <span class="number">1177.09</span>
          <span class="unit">万</span>
        </div>
        <div class="stat-desc">解决（企业）需求金额</div>
      </div>
    </div>
    <div class="info-sec">
      <div class="sec-title">
        <span class="txt">政策资讯</span>
      </div>
      <div class="policy-sec">
        <div class="sec-inner">
          <div class="policy-list">
            <div class="policy-item">
              <div class="title">【专题】福建省中小微企业纾困专项资金贷款申请名单公示</div>
              <div class="source">2021-05-26 | 福建省人力资源和社会保障厅</div>
              <div class="desc">福建省中小微企业纾困专项资金贷款申请名单公示</div>
            </div>
            <div class="policy-item">
              <div class="title">【专题】福建省商贸贷外贸贷企业池入池申请名单的公示</div>
              <div class="source">2021-05-25 | 福建省人力资源和社会保障厅</div>
              <div class="desc">关于福建省商贸贷外贸贷企业池入池申请名单的公示</div>
            </div>
            <div class="policy-item">
              <div class="title">个体工商户、高校毕业生、台企台胞......即刻登录，开启融资便捷通道</div>
              <div class="source">2021-05-24 | 福建省人力资源和社会保障厅</div>
              <div class="desc">个体工商户、高校毕业生、台企台胞......即刻登录，开启融资便捷通道</div>
            </div>
          </div>
          <div class="footer">
            <el-button type="primary">查看更多</el-button>
          </div>
        </div>

      </div>
    </div>
    <div class="info-sec">
      <div class="sec-title">
        <span class="txt">创业培训服务</span>
      </div>
      <div class="train-sec">
        <div class="train-item">
          <div class="img-box">
            <img class="bg" :src="logoImg" alt="">
          </div>
          <div class="title">霞浦县第163期(SIYB)培训</div>
          <div class="desc">
            <div class="txt">开班时间：2021-06-26至07-10</div>
            <div class="txt">培训类型：SYB创业培训</div>
          </div>
        </div>
        <div class="train-item">
          <div class="img-box">
            <img class="bg" :src="logoImg" alt="">
          </div>
          <div class="title">霞浦县第163期(SIYB)培训</div>
          <div class="desc">
            <div class="txt">开班时间：2021-06-26至07-10</div>
            <div class="txt">培训类型：SYB创业培训</div>
          </div>
        </div>
        <div class="train-item">
          <div class="img-box">
            <img class="bg" :src="logoImg" alt="">
          </div>
          <div class="title">霞浦县第163期(SIYB)培训</div>
          <div class="desc">
            <div class="txt">开班时间：2021-06-26至07-10</div>
            <div class="txt">培训类型：SYB创业培训</div>
          </div>
        </div>
        <div class="train-item">
          <div class="img-box">
            <img class="bg" :src="logoImg" alt="">
          </div>
          <div class="title">霞浦县第163期(SIYB)培训</div>
          <div class="desc">
            <div class="txt">开班时间：2021-06-26至07-10</div>
            <div class="txt">培训类型：SYB创业培训</div>
          </div>
        </div>
      </div>
      <div class="more-box">
        <el-button type="primary">查看更多</el-button>
      </div>
    </div>
    <div class="info-sec">
      <div class="sec-title">
        <span class="txt">合作机构</span>
      </div>
      <div class="company-sec">
        <div class="company-list">
          <div class="company-item">
            <img class="logo" :src="logoImg" alt="">
          </div>
          <div class="company-item">
            <img class="logo" :src="logoImg" alt="">
          </div>
          <div class="company-item">
            <img class="logo" :src="logoImg" alt="">
          </div>
          <div class="company-item">
            <img class="logo" :src="logoImg" alt="">
          </div>
          <div class="company-item">
            <img class="logo" :src="logoImg" alt="">
          </div>
          <div class="company-item">
            <img class="logo" :src="logoImg" alt="">
          </div>
          <div class="company-item">
            <img class="logo" :src="logoImg" alt="">
          </div>
          <div class="company-item">
            <img class="logo" :src="logoImg" alt="">
          </div>
          <div class="company-item">
            <img class="logo" :src="logoImg" alt="">
          </div>
          <div class="company-item">
            <img class="logo" :src="logoImg" alt="">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import logoImg from '@/assets/images/logo.png'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      logoImg
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo', 'token', 'roles'])
  },
  methods: {
    handleApply(kind) {
      if(this.token) {
        this.$router.push('/loan/list?kind=' + kind)
      } else {
        this.$alert('请先登录再进行申请操作', '登录提示', {
          type: 'warning',
          confirmButtonText: '知道了'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.loan-wrapper {
  min-width: 1220px;
  max-width: 1920px;
  margin: 0 auto;
  .banner-sec {
    height: 480px;
    margin-bottom: 30px;
    background: url(../../assets/images/banner.png) no-repeat $blue;
    background-size: cover;
    background-position: center;
  }
  .entry-sec {
    width: 1220px;
    margin: 0 auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 30px;
    .entry-item {
      height: 200px;
      width: 386px;
      padding: 0 30px;
      border-radius: 3px;
      background: url(../../assets/images/mod.png) no-repeat #eaf7ff;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      transition: all 0.3s;
      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transform: translateY(-10px);
      }
      .title {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .desc {
        font-size: 14px;
        color: #999;
        margin-bottom: 20px;
      }
      .stat {
        font-size: 26px;
        color: #154ff3;
        margin-bottom: 30px;
        .number {
          font-size: 38px;
        }
      }
      .stat-desc {
        font-size: 20px;
        color: #333;
      }
    }
    .entry-item2 {
      background: url(../../assets/images/mod.png) no-repeat #ecf1ff;
    }
    .entry-item3 {
      background: url(../../assets/images/mod.png) no-repeat #fff9ef;
    }
  }
  .info-sec {
    margin-bottom: 30px;
    .more-box {
      text-align: center;
    }
    .sec-title {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      padding: 30px 0;
      .txt {
        position: relative;
        &::before {
          position: absolute;
          left: -120px;
          top: 10px;
          content: '';
          width: 100px;
          height: 2px;
          background: #ddd;
        }
        &::after {
          position: absolute;
          right: -120px;
          top: 10px;
          content: '';
          width: 100px;
          height: 2px;
          background: #ddd;
        }
      }
    }
  }
  .policy-sec {
    padding: 60px 0;
    background: url(../../assets/images/policy.png) no-repeat #fff;
    background-size: cover;
    background-position: center;
    .sec-inner {
      width: 1220px;
      margin: 0 auto;
    }
    .policy-list {
      width: 620px;
      box-sizing: border-box;
      margin-bottom: 20px;
      .policy-item {
        margin-bottom: 30px;
        padding: 30px;
        background: rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        transition: all 0.3s;
        cursor: pointer;
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .source {
          font-size: 14px;
          color: #999;
          margin-bottom: 15px;
          transition: all 0.3s;
        }
        .desc {
          font-size: 14px;
          color: #666;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          transition: all 0.3s;
        }
        &:last-child {
          margin-bottom: 0;
          border-bottom: none;
        }
        &:hover {
          color: #fff;
          background: rgba($color: #0026e0, $alpha: 0.5);
          transform: translateX(50px);
          box-shadow: 0 0 20px rgba($color: #0026e0, $alpha: 0.5);
          .source {
            color: #fff;
          }
          .desc {
            color: #fff;
          }
        }
      }
    }
    .footer {
      width: 620px;
      text-align: center;
    }
  }
  .train-sec {
    width: 1220px;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    .train-item {
      width: 272px;
      height: 350px;
      background: #fff;
      padding: 20px 25px;
      box-sizing: border-box;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      transition: all 0.3s;
      cursor: pointer;
      .img-box {
        margin-bottom: 20px;
        height: 210px;
        overflow: hidden;
        .bg {
          display: block;
          width: 100%;
          height: 100%;
          transition: all 0.3s;
        }
      }
      .title {
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 20px;
        text-align: center;
      }
      .desc {
        padding: 0 15px;
        font-size: 12px;
        color: #999;
        .txt {
          margin-bottom: 5px;
        }
      }
      &:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        transform: translateY(-10px);
        .bg {
          transform: scale(1.5);
        }
      }
    }
  }
  .company-sec {
    background: #fff;
    padding: 20px 0;
    .company-list {
      width: 1220px;
      margin: 0 auto;
      display: flex;
      flex-flow: row wrap;
    }
    .company-item {
      width: 20%;
      padding: 20px;
      .logo {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>