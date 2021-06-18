<template>
  <div class="layout-wrapper">
    <sidebar></sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar></nav-bar>
        <tags-view></tags-view>
      </div>
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/layout/components/Sidebar'
import NavBar from '@/layout/components/NavBar'
import TagsView from '@/layout/components/TagsView'

export default {
  components: {
    Sidebar,
    NavBar,
    TagsView
  }
}
</script>

<style lang="scss">
.layout-wrapper {
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  width: 100%;
  height: 100%;
  .main-container {
    flex-grow: 1;
    display: flex;
    flex-flow: column nowrap;
    .fixed-header {
      border-bottom: 1px solid #eee;
    }
    .app-main {
      box-sizing: border-box;
      flex-grow: 1;
      overflow-y: scroll;
      background: #fafafa;
    }
  }
}
</style>
