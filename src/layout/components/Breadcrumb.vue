<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <template v-for="(route, index) in breadList" :key="index">
      <el-breadcrumb-item :to="route.path">{{route.meta.title}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteLocationMatched, RouteLocationNormalizedLoaded } from 'vue-router'

export default defineComponent({
  data() {
    return {
      breadList: []
    } as { breadList: RouteLocationMatched[] }
  },
  created() {
    this.handleLoadData(this.$route.matched)
  },
  watch: {
    $route: function (val: RouteLocationNormalizedLoaded) {
      this.handleLoadData(val.matched)
    }
  },
  methods: {
    handleLoadData(value: RouteLocationMatched[]) {
      if(value[0].path === '/') {
        this.breadList = []
      } else {
        this.breadList = value
      }
    }
  }
})
</script>

<style>
</style>