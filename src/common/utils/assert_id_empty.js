/**
 * 判断Id是否获取到
 *
 * 数字0、字符串'0'、null、undefined、以及空字符串''，都是未获取到会员id.
 *
 * true: uid 为空，未获取到
 * false: uid已获取到
 */
export default function(id) {
  return !id || id == "" || id == "0";
}
