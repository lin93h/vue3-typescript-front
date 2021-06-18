import axios, { ResponseType, AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'

// 初始化拦截器
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  if(store.getters['user/token']) {
    config.headers['Authorization'] = 'Bearer ' + store.getters['user/token']
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use((response) => {
  const { data, request } = response
  if(request.responseType === 'blob') {
    return response
  }
  if(data.code === 401) {
    store.dispatch('user/clearState')
    ElMessageBox.alert(data.msg, '提示', {
      type: 'warning',
      confirmButtonText: '重新登录',
      showClose: false,
      callback: () => {
        location.reload()
      }
    })
    return data
  } else if(data.code === 200) {
    return data
  } else {
    ElMessageBox.alert(data.msg, '提示', {
      type: 'error',
      confirmButtonText: '知道了'
    })
    return Promise.reject(data)
  }
}, (error) => {
  ElMessage.error(error.message)
  return Promise.reject(error)
})

// 请求方式类型
type HttpMethod = 'get' | 'post' | 'put' | 'delete'

// 请求参数
interface HttpArgument {
  method: HttpMethod
  url: string
  data?: Record<string, unknown>
  headers?: Record<string, unknown>
  responseType?: ResponseType
}

/**
 * 返回数据类型
 * @property code 编码
 * @property msg 提示文字
 * @property data 返回数据
 * @property [propName] 任意其他参数
 */
export type ResponseData = {
  code?: number
  msg?: string
  data?: any
  [propName: string]: any
}

// 请求函数类型
interface RequestType {
  (argument: HttpArgument): Promise<ResponseData>
}
const request: RequestType = async (argument: HttpArgument) => {
  const { method, url, data, headers, responseType } = argument
  const res: AxiosResponse<ResponseData> = await instance({
    method,
    url,
    data,
    headers,
    responseType
  })
  return res
}

export default request