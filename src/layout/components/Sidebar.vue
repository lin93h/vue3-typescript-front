<template>
  <div class="sidebar-wrapper" :class="sidebarCollapse ? 'sidebar-close' : ''">
    <el-menu :default-active="activeRoute" :collapse="sidebarCollapse" :router="true" :collapse-transition="false" :background-color="variables.menuBg"
             :text-color="variables.menuText" :unique-opened="true" :active-text-color="variables.menuActiveText">
      <template v-for="route in routes" :key="route.path">
        <template v-if="route.children && route.children.length">
          <el-submenu :index="route.path" v-if="!route.meta.hidden">
            <template #title>
              <i class="icon" :class="route.meta.icon" v-if="route.meta.icon"></i>
              <span>{{route.meta?.title}}</span>
            </template>
            <template v-for="child in route.children" :key="child.path">
              <el-menu-item :index="route.path + '/' + child.path" v-if="!child.meta.hidden">
                <span>{{child.meta?.title}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="route.path" v-if="!route.meta.hidden">
            <i class="icon" :class="route.meta.icon" v-if="route.meta.icon"></i>
            <span>{{route.meta?.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import variables from '@/assets/styles/variables.scss'
import { RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from '@/router'

interface DataType {
  activeRoute: string
  routes: RouteRecordRaw[]
}

export default defineComponent({
  data() {
    return {
      variables,
      activeRoute: '',
      routes: []
    } as DataType
  },
  computed: {
    ...mapGetters('app', [
      'sidebarCollapse'
    ])
  },
  created() {
    const routes = this.$router.getRoutes()
    const dashboard = routes.filter(route => ((route?.name || '') as string).toLocaleLowerCase() === 'dashboard') as RouteRecordRaw[]
    this.routes = dashboard.concat(asyncRoutes)
    this.activeRoute = this.$route.path
  },
  watch: {
    $route: function(value) {
      this.activeRoute = value.path
    }
  }
})
</script>

<style lang="scss">
@import '../../assets/styles/variables';
.sidebar-wrapper {
  flex-shrink: 0;
  width: 200px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: all 0.3s;
  position: relative;
  background: $menuBg;
  .icon {
    color: $menuText;
    margin-right: 5px;
  }
  .is-active > .el-submenu__title {
    color: $subMenuActiveText !important;
    .icon {
      color: $subMenuActiveText;
    }
  }
}
.sidebar-close {
  width: 64px;
}
</style>