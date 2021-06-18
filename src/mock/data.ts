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
      nickName: 'mock用户'
    }
  }
}