import request from '@/utils/request'

// 参数类型
type ParamsType = Record<string, unknown>

export function captchaImage() {
  return request({
    method: 'get',
    url: 'captchaImage'
  })
}