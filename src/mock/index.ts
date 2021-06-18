import Mock from 'mockjs'
import { captchaImage, login, getInfo, logout } from './data'

Mock.mock('/check/captchaImage', 'get', captchaImage)
Mock.mock('/check/login', 'post', login)
Mock.mock('/check/getInfo', 'get', getInfo)
Mock.mock('/check/logout', 'post', logout)

export default Mock