/**
 * 获取指定url中的参数
 * @param  {[type]} url  [description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export default function getQueryString(url, name) {
  //接收参数id
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let search = '', searchIndex = url.indexOf('?');
  if( searchIndex > 0){
    search = url.substr(searchIndex + 1)
  }
  var r = search.match(reg);
  if (r != null){
    return unescape(r[2]);
  }else{
    return undefined;
  }
}
