<template>
  <div class="layout-wrapper">
    <sidebar></sidebar>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  components: {}
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
  }
}
</style>
