/**
 * 信息脱敏
 */
export default {
  /**
   * 对身份证信息进行脱敏处理，身份证展示前5位和后三位
   * @return {[type]} [description]
   */
  idcard(str) {
    return str && str.length >= 15 ? desensitize(str, 4, str.length - 3) : str;
  },
  iphone(str) {
    return str;
  },
  /**
   * 对护照信息进行脱敏处理，护照展示前2位和后2位  最少5位
   * @return {[type]} [description]
   */
  passport(str) {
    if (str) {
      if (str.length >= 5 && str.length <= 7) {
        return desensitize(str, 1, str.length - 2);
      } else if (str.length > 7) {
        return desensitize(str, 2, str.length - 3);
      } else {
        return str;
      }
    }
    return str;
  },
  /**
   * 对军官证信息进行脱敏处理，军官证展示前3位和后3位  最少7位
   * @return {[type]} [description]
   */
  militaryId(str) {
    return str && str.length >= 15 ? desensitize(str, 2, str.length - 3) : str;
  }
};

/**
 * 将字符串由指定开始到结束位置以*号加密
 * @param  {[type]} str   [description]
 * @param  {[type]} start [description]
 * @param  {[type]} end   [description]
 * @return {[type]}       [description]
 */
function desensitize(str, start, end) {
  str = str.split("");
  for (let i = 0; i < str.length; i++) {
    if (i > start && i < end) {
      str.splice(i, 1, "*");
    }
  }
  return str.join("");
}
