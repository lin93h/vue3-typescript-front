<template>
  <div class="tags-view-wrapper">
    <div class="tags-view-inner" ref="scrollContainer" @wheel="handleScroll">
      <router-link class="tag-item" active-class="tag-active" v-for="(tag, index) in visibleViews" :key="index" :to="tag.fullPath || tag.path">
        <span>{{tag.meta.title}}</span>
        <i class="el-icon-close" @click.prevent="handleRemove(tag)" v-if="!tag.meta?.affix"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('tagsView', ['visibleViews', 'cacheViews'])
  },
  created() {
    const routes = this.$router.getRoutes()
    routes.map(route => {
      if(route.children && route.children.length) {
        route.children.map(child => {
          if(child.meta?.affix) {
            this.setTagsView({
              ...child,
              fullPath: route.path + child.path
            })
          }
          return child
        })
      } else {
        if(route.meta?.affix) {
          this.setTagsView(route)
        }
      }
      return route
    })
    this.setTagsView(this.$route)
  },
  watch: {
    $route: function (val) {
      this.setTagsView(val)
    }
  },
  methods: {
    ...mapActions('tagsView', ['setTagsView', 'removeTagsView']),
    handleScroll(event) {
      // console.log('滚动111111', event.deltaY)
      this.$refs['scrollContainer'].scrollLeft += (event.deltaY / 2)
    },

    // 移除标签
    handleRemove(route) {
      this.removeTagsView(route).then(() => {
        this.$router.replace(this.cacheViews[this.cacheViews.length - 1])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-wrapper {
  .tags-view-inner {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 40px;
    padding: 5px 0 0;
    position: relative;
  }
  .tag-active {
    background: green;
    color: #fff;
  }
  .tag-item {
    flex-shrink: 0;
    font-size: 12px;
    padding: 5px;
    margin-right: 5px;
    border: 1px solid #eee;
    border-radius: 2px;
    transition: all 0.3s;
    &:first-child {
      margin-left: 10px;
    }
    &:last-child {
      margin-right: 10px;
    }
    .el-icon-close {
      transition: all 0.3s;
      font-weight: bold;
      border-radius: 50%;
      margin-left: 5px;
      &:hover {
        color: #fff;
        background: #999;
      }
    }
  }
}
</style>