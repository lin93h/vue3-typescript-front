import { Random } from 'mockjs'

export function captchaImage() {
  return {
    code: 200,
    msg: 'success',
    img: Random.dataImage('80x40', '9527')
  }
}
export function login() {
  return {
    code: 200,
    msg: '',
    token: '666666666666666'
  }
}
export function logout() {
  return {
    code: 200,
    msg: '',
    token: '666666666666666'
  }
}
export function getInfo() {
  return {
    code: 200,
    msg: '',
    roles: ['admin'],
    user: {
      nickName: 'mock用户',
      remark: '350123199310072351'
    }
  }
}
export function applyList() {
  return {
    code: 200,
    msg: '',
    data: [
      { areaName: '鼓楼区', companyName: '众智汇云', companyCredit: '123132313', amount: '10000', applyTime: '2021-06-22 00:00:00', statusName: '待审核', status: 1 }
    ]
  }
}