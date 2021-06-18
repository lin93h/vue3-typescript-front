import { UserState } from './modules/user'
import { GetterTree } from 'vuex'

interface StateType {
  user: UserState
}

export interface GettersType extends UserState {
  [key: string]: unknown
}

const getters: GetterTree<StateType, unknown> = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  roles: (state) => state.user.roles
}

export default getters