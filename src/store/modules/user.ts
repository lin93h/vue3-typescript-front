import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { getCookieToken, setCookieToken, removeCookieToken } from '@/utils/cookie'
import { getUserInfo } from '@/api/user'

export type UserState = {
  token: string | undefined | null
  userInfo: Record<string, unknown> | null
  roles: Array<string>
  qiniuToken: {
    token?: string
    domain?: string
  }
}

const state: UserState = {
  token: getCookieToken(),
  userInfo: null,
  roles: [],
  qiniuToken: {}
}

const getters: GetterTree<UserState, unknown> = {
  token: state => {
    return state.token
  },
  userInfo: state => {
    return state.userInfo
  },
  roles: state => {
    return state.roles
  },
  qiniuToken: state => {
    return state.qiniuToken
  }
}

const mutations: MutationTree<UserState> = {
  setToken(state: UserState, token: string) {
    state.token = token
  },
  setUser(state: UserState, userInfo: Record<string, unknown>) {
    state.userInfo = userInfo
  },
  setRoles(state: UserState, roles: Array<string>) {
    state.roles = roles
  }
}

const actions: ActionTree<UserState, unknown> = {
  // 设置token
  setToken({ commit }, token: string) {
    setCookieToken(token)
    commit('setToken', token)
  },
  clearState({ commit }) {
    removeCookieToken()
    commit('setToken', '')
    commit('setUser', null)
    commit('setRoles', [])
  },
  // 设置用户信息
  getUser({ commit }) {
    return getUserInfo().then(res => {
      const { user, roles } = res
      commit('setUser', user)
      commit('setRoles', roles)
      return res
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