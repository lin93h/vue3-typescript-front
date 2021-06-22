import request from '@/utils/request'

interface ParamsType {
  [name: string]: any
}

export function applyList(data: ParamsType) {
  return request({
    method: 'get',
    url: 'lnb/person/list',
    data
  })
}

// 新增个人创业贷款申请
export function addPerson(data: ParamsType) {
  return request({
    method: 'post',
    url: 'lnb/person/addPerson',
    data
  })
}

// 编辑人员
export function editPerson(data: ParamsType) {
  return request({
    method: 'put',
    url: 'lnb/person/editPerson',
    data
  })
}
// 个人详情
export function personDetail(data: ParamsType) {
  return request({
    method: 'get',
    url: 'lnb/person/getInfo',
    data
  })
}