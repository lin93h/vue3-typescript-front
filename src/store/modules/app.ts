import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { getSidebar, setSidebar } from '@/utils/cookie'

interface AppTypes {
  sidebarCollapse: boolean
}

const state: AppTypes = {
  sidebarCollapse: getSidebar() === '1'
}

const getters: GetterTree<AppTypes, unknown> = {
  sidebarCollapse: (state) => {
    return state.sidebarCollapse
  }
}

const mutations: MutationTree<AppTypes> = {
  setSidebarStatus: (state) => {
    state.sidebarCollapse = !state.sidebarCollapse
    if(state.sidebarCollapse) {
      setSidebar('1')
    } else {
      setSidebar('0')
    }
  }
}

const actions: ActionTree<AppTypes, unknown> = {
  setSidebarStatus: ({ commit }) => {
    commit('setSidebarStatus')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}