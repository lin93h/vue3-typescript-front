import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RouteLocationNormalized } from 'vue-router'

interface TagsViewType {
  visibleViews: RouteLocationNormalized[]
  cacheViews: string[]
}

const state: TagsViewType = {
  visibleViews: [],
  cacheViews: []
}

const getters: GetterTree<TagsViewType, unknown> = {
  visibleViews: state => {
    return state.visibleViews
  },
  cacheViews: state => {
    return state.cacheViews
  }
}

const mutations: MutationTree<TagsViewType> = {
  setTagsView(state, route: RouteLocationNormalized) {
    if (!state.cacheViews.includes(route.fullPath || route.path)) {
      state.visibleViews.push(route)
      state.cacheViews.push(route.fullPath || route.path)
    }
  },
  removeTagsView(state, route: RouteLocationNormalized) {
    const index = state.cacheViews.indexOf(route.fullPath || route.path)
    state.visibleViews.map((item, i) => {
      if (index === i) {
        return null
      }
      return item
    })
    state.cacheViews.splice(index, 1)
    state.visibleViews.splice(index, 1)
  }
}

const actions: ActionTree<TagsViewType, unknown> = {
  setTagsView({ commit }, route: RouteLocationNormalized) {
    commit('setTagsView', route)
  },
  removeTagsView({ commit }, route: RouteLocationNormalized) {
    return new Promise((resolve) => {
      commit('removeTagsView', route)
      resolve(route)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}