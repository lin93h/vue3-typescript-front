import Mock from 'mockjs'
import { captchaImage, login, getInfo, logout, applyList } from './data'

Mock.mock('/check/captchaImage', 'get', captchaImage)
Mock.mock('/check/login', 'post', login)
Mock.mock('/check/getInfo', 'get', getInfo)
Mock.mock('/check/logout', 'post', logout)
Mock.mock('/check/logout', 'post', logout)
Mock.mock('/check/lnb/person/list', 'get', applyList)

export default Mock