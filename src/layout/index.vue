<template>
  <div class="layout-wrapper">
    <app-header></app-header>
    <div class="main-container">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './Header/index.vue'
import AppFooter from './Footer/index.vue'

export default defineComponent({
  components: {
    AppHeader,
    AppFooter
  }
})
</script>

<style lang="scss">
.layout-wrapper {
  background: $bg;
  .main-container {
    margin-top: 122px;
    min-height: calc(100vh - 112px);
    .limit-width {
      width: 1220px;
      margin: 0 auto;
    }
  }
}
</style>
