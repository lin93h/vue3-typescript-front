import axios from 'axios'
import request from '@/utils/request'

export function captchaImage() {
  return request({
    method: 'get',
    url: 'captchaImage'
  })
}

// 图片上传token
export function qiNiuYunToken() {
  return request({
    method: 'get',
    url: 'common/qiNiuYunToken'
  })
}

// 直接上传七牛云
export function uploadQiniuyun(data: { [name: string]: any }) {
  return axios.post('https://upload-z2.qiniup.com', data)
}

// 获取全部地区数据
export function systemDeptList() {
  return request({
    method: 'get',
    url: 'system/dept/list'
  })
}

// 获取树形地区数据
export function systemTreeList() {
  return request({
    method: 'get',
    url: 'system/dept/treeselect'
  })
}