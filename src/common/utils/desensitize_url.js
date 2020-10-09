/**
 * URL脱敏
 *
 * 哪些属于脱敏的字段：
 *
 * - openid, unionid code 当前微信用户的账号信息。
 *
 * 哪些场景需要脱敏：涉及用户信息外泄的场景都需要。
 *
 * - 分享URL。
 * - 生成当前URL的二维码链接。
 *
 * @param  {String} url 需要脱敏的url
 * @param  {Array} keys 脱敏的参数列表
 * @return {String}     经过脱敏的字符串。
 */
export default function processURL(url, keys = ["openid", "unionid", "code"]) {
  let reg = new RegExp("(" + keys.join("|") + ")=[^&#]*", "ig");
  url = url
    .replace(reg, "")
    .replace(/&{2,}/gi, "&")
    .replace(/\?&/i, "?");
  return url;
}
