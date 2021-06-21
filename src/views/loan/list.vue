<template>
  <div class="page-wrapper limit-width loan-list-wrapper">
    <div class="inner-section">
      <div class="top-con">
        <i class="icon el-icon-info"></i>
        <span class="txt">创业担保贷政策详情</span>
      </div>
      <div class="loan-section">
        <div class="sec-header">
          <div class="title">{{curKind == 1 ? '个人' : '小微企业'}}创业担保贷款</div>
          <el-button type="primary" @click="handleApply">借款资质申请</el-button>
        </div>
        <el-table :data="tableData" border height="calc(100vh - 300px)" header-cell-class-name="table-header-cell">
          <el-table-column label="所属地区" prop="areaName"></el-table-column>
          <template v-if="curKind == 1">
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="证件号码" prop="idCard" width="180"></el-table-column>
          </template>
          <template v-else>
            <el-table-column label="企业名称" prop="companyName"></el-table-column>
            <el-table-column label="统一社会信用代码" prop="companyCredit" width="180"></el-table-column>
          </template>
          <el-table-column label="融资需求金额(万元)" prop="amount" align="right">
            <template #default="{row}">
              {{handleNumber(row.amount/1000000)}}
            </template>
          </el-table-column>
          <el-table-column label="申请日期" prop="applyTime">
            <template #default="{row}">
              {{handleFormatDate(row.applyTime, 'yyyy-MM-dd')}}
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="status" align="center">
            <template #default="{row}">
              <el-tag type="info" v-if="row.status == 0">草稿</el-tag>
              <el-tag type="warning" v-if="row.status == 1">待审核</el-tag>
              <el-tag type="primary" v-if="row.status == 2">初审通过</el-tag>
              <el-tag type="success" v-if="row.status == 3">复审通过</el-tag>
              <el-tag type="success" v-if="row.status == 8">已同步</el-tag>
              <el-tag type="danger" v-if="row.status == -1">初审不通过</el-tag>
              <el-tag type="danger" v-if="row.status == -2">复审不通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template #default="{row}">
              <el-button type="warning" @click="handleEdit(row)" v-if="[-1, -2, 0].includes(row.status)">编辑</el-button>
              <el-button type="primary" @click="handleShow(row)" v-else>详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatDigit, formatDate } from '@/utils/index'
import { mapGetters } from 'vuex'

export default defineComponent({
  data() {
    return {
      tableData: [],
      curKind: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.curKind = this.$route.query.kind as string
    this.handleLoadData()
  },
  methods: {
    handleLoadData() {
      console.log('11111')
    },

    // 申请
    handleApply() {
      if (this.curKind === '1') {
        this.$router.push({ path: '/loan/apply/personal' })
      } else {
        this.$router.push({ path: '/loan/apply/enterprise' })
      }
    },

    handleEdit(data: { [key: string]: string }) {
      if (this.curKind === '1') {
        this.$router.push({
          path: '/loan/apply/personal',
          query: { id: data.id }
        })
      } else {
        this.$router.push({
          path: '/loan/apply/enterprise',
          query: { id: data.id }
        })
      }
    },

    handleShow(data: { [key: string]: string }) {
      if (this.curKind === '1') {
        this.$router.push({
          path: '/loan/detail/personal',
          query: { id: data.id }
        })
      } else {
        this.$router.push({
          path: '/loan/detail/enterprise',
          query: { id: data.id }
        })
      }
    },

    // 格式化日期
    handleFormatDate(date: string | Date, type: string) {
      return formatDate(date, type)
    },

    // 格式化数字
    handleNumber(num: number) {
      return formatDigit(num)
    }
  }
})
</script>

<style lang="scss">
.loan-list-wrapper {
  background: #fff;
  .inner-section {
    padding: 30px;
  }
  .top-con {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: 15px;
    .icon {
      color: $yellow;
      font-size: 20px;
      margin-right: 5px;
    }
    .txt {
      color: $blue;
      cursor: pointer;
    }
  }
  .loan-section {
    .sec-header {
      height: 50px;
      padding: 0 15px;
      background: rgb(9, 110, 215);
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 15px;
        color: #fff;
      }
    }
  }
}
</style>