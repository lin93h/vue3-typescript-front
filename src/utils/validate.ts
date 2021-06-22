/**
 * Created by PanJiaChen on 16/11/18.
 */

// 身份证校验
export function isCardNo(card: string) {
  const reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
  return reg.test(card)
}

// 校验密码强度
export function passwordLevel(value: string) {
  let modes = 0
  let level = 0
  // 未输入
  if(value.length < 1) {
    level = 0
  } else if(value.length >= 1 && value.length < 8) {
    // 输入大于0小于8个字符
    modes = 1
  } else {
    if(/\d/.test(value)) modes++ // 数字
    if(/[a-z]/.test(value)) modes++ // 小写
    if(/[A-Z]/.test(value)) modes++ // 大写
    if(/\W/.test(value)) modes++ // 特殊字符
  }
  switch(modes) {
    case 1:
      level = 1
      break
    case 2:
      level = 2
      break
    case 3:
    case 4:
      level = 3
      break
    default:
      level = 0
      break
  }
  return level
}

/**
 * 手机号码校验
 */
export function isPhoneNumber(code: string) {
  let result = false
  // 手机
  const mobile = /^0?(13|14|15|16|17|18|19)[0-9]{9}$/
  // 固定电话
  const tel = /^[0-9]{3,4}[-][0-9]{8}$/
  const mbState = mobile.test(code)
  const telState = tel.test(code)
  if(mbState || telState) {
    result = true
  }
  return result
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url: string) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str: string) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str: string) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str: string) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
