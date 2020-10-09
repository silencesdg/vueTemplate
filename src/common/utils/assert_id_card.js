/**
 * 认证身份证号
 */
export default function assertIDCard(idcard){
  let errorMsg = validateIDCard(idcard);
  if(typeof errorMsg == 'string'){
    throw new Error(errorMsg);
  }else{
    // pass.
  }
}


function validateIDCard(obj) {
  if (!obj || !obj.length) return '请填写身份证号';
  const aCity = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙 江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖 北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西 藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' };
  let iSum = 0;
  let info = 0;
  let strIDno = obj;
  const idCardLength = strIDno.length;
  if (!/^\d{17}(\d|x)$/i.test(strIDno) && !/^\d{15}$/i.test(strIDno)) {
    // 非法身份证号
    info = 1;
  }
  if (aCity[parseInt(strIDno.substring(0, 2), 10)] == null) {
    // 非法地区
    info = 2;
  }

  let sBirthday;
  // 15位身份证转换为18位
  if (idCardLength === 15) {
    sBirthday = '19' + strIDno.substr(6, 2) + '-' + Number(strIDno.substr(8, 2)) + '-' + Number(strIDno.substr(10, 2));
    const d = new Date(sBirthday.replace(/-/g, '/'));
    const dd = d.getFullYear().toString() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    if (sBirthday !== dd) {
      // 非法生日
      info = 3;
    }

    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let nTemp = 0;
    strIDno = strIDno.substr(0, 6) + '19' + strIDno.substr(6, strIDno.length - 6);
    for (let i = 0; i < 17; i++) {
      nTemp += strIDno.substr(i, 1) * arrInt[i];
    }
    strIDno += arrCh[nTemp % 11];
  }

  // 判断是否大于2078年，小于1900年
  const year = strIDno.substring(6, 10);
  if (year < 1900 || year > 2078) {
    // 非法生日
    info = 3;
  }

  // 18位身份证处理
  // 在后面的运算中x相当于数字10,所以转换成a
  strIDno = strIDno.replace(/x$/i, 'a');

  sBirthday = strIDno.substr(6, 4) + '-' + Number(strIDno.substr(10, 2)) + '-' + Number(strIDno.substr(12, 2));
  const d = new Date(sBirthday.replace(/-/g, '/'));
  if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())) {
    // 非法生日
    info = 3;
  }

  // 身份证编码规范验证
  for (let i = 17; i >= 0; i--) {
    iSum += (Math.pow(2, i) % 11) * parseInt(strIDno.charAt(17 - i), 11);
  }

  if (iSum % 11 !== 1) {
    // 非法身份证号
    info = 1;
  }

  // 判断是否屏蔽身份证
  const words = ['11111119111111111', '12121219121212121'];

  for (let k = 0; k < words.length; k++) {
    if (strIDno.indexOf(words[k]) !== -1) {
      info = 1;
    }
  }

  if (info !== 0) {
    return '身份证号格式不对';
  }
  return true;
}
