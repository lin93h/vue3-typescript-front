<template>
  <div class="page-wrapper limit-width">
    <div class="loan-header-sec">
      <el-button type="primary" @click="handleBack">返回列表</el-button>
    </div>
    <div class="loan-personal-wrapper">
      <div class="title">个人创业担保贷款申请</div>
      <!-- <personal-info @success="handleBack"></personal-info> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import PersonalInfo from '@/views/loan/components/PersonalInfo.vue'

export default defineComponent({
  // components: {
  //   PersonalInfo
  // },
  data() {
    return {
      stepActive: 0,
      id: ''
    }
  },
  methods: {
    // 返回
    handleBack() {
      this.$router.back()
    }
  }
})
</script>

<style lang="scss">
.loan-header-sec {
  margin-bottom: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
}
.loan-personal-wrapper {
  background: #fff;
  padding-bottom: 30px;
  margin-bottom: 50px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 20px 30px;
    border-bottom: 1px solid #eee;
  }
  .step-section {
    padding: 20px 0;
  }
  .form-section {
    padding: 30px 40px;
  }
  .footer-section {
    text-align: center;
  }
}
</style>