import _ from 'lodash';
// 姓名敏感词
const sensitiveList = ['test', '法轮功', '发轮功', '张三', '李四', '王五', 'SB', '逼', '傻逼', '傻冒', '王八', '王八蛋', '混蛋', '你妈', '你大爷', '操你妈', '你妈逼', '先生', '小姐', '男士', '女士', '夫人', '小沈阳', '丫蛋', '男人', '女人', '骚', '騒', '搔', '傻', '逼', '叉', '瞎', '屄', '屁', '性', '骂', '疯', '臭', '贱', '溅', '猪', '狗', '屎', '粪', '尿', '死', '肏', '骗', '偷', '嫖', '淫', '呆', '蠢', '虐', '疟', '妖', '腚', '蛆', '鳖', '禽', '兽', '屁股', '畸形', '饭桶', '脏话', '可恶', '吭叽', '小怂', '杂种', '娘养', '祖宗', '畜生', '姐卖', '找抽', '卧槽', '携程', '无赖', '废话', '废物', '侮辱', '精虫', '龟头', '残疾', '晕菜', '捣乱', '三八', '破鞋', '崽子', '混蛋', '弱智', '神经', '神精', '妓女', '妓男', '沙比', '恶性', '恶心', '恶意', '恶劣', '笨蛋', '他丫', '她丫', '它丫', '丫的', '给丫', '删丫', '山丫', '扇丫', '栅丫', '抽丫', '丑丫', '手机', '查询', '妈的', '犯人', '垃圾', '死鱼', '智障', '浑蛋', '胆小', '糙蛋', '操蛋', '肛门', '是鸡', '无赖', '赖皮', '磨几', '沙比', '智障', '犯愣', '色狼', '娘们', '疯子', '流氓', '色情', '三陪', '陪聊', '烤鸡', '下流', '骗子', '真贫', '捣乱', '磨牙', '磨积', '甭理', '尸体', '下流', '机巴', '鸡巴', '鸡吧', '机吧', '找日', '婆娘', '娘腔', '恐怖', '穷鬼', '捣乱', '破驴', '破罗', '妈必', '事妈', '神经', '脑积水', '事儿妈', '草泥马', '杀了铅笔', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J8', 's.b', 'sb', 'sbbt', 'Sb', 'Sb', 'sb', 'bt', 'bt', 'sb', 'saorao', 'SAORAO', 'fuck', 'shit', 'ms', 'Ms', 'MS', 'mS', 'mr', 'Mr', 'MR', 'mR', 'mrs', 'mrS', 'mRs', 'mRS', 'Mrs', 'MrS', 'MRs', 'MRS', '0', '*', '，', '。', '`', ':', ';', '-', '_', '－', '<', '>', '”', '’', '&', '\\', '：', '='];

/**
 * 文本中是否带有敏感词
 * @param  {String}  str 匹配文字
 * @return {Boolean}     含有敏感词则返回true。
 */
function isInSensitiveList(str) {
  for (let i = 0; i < sensitiveList.length; i++) {
    if (str.indexOf(sensitiveList[i]) > -1) return sensitiveList[i];
  }
  return false;
}
// 如果失败，传回字符串， 如果成功传回false， 失败返回字符串
// isChina 0:不限 1：中文  2：英文
function isNameNotValid(str, isChina, placeholder = '姓名') {
  let temp = str;
  if (_.isString(str)) {
    temp = [temp];
  }
  for (let i = 0; i < temp.length; i++) {
    if (!temp[i]) {
      return `请填写${placeholder}`;
    } else if (temp[i].length < 2) {
      return `${placeholder}至少2个字`;
    }
    else if (isInSensitiveList(temp[i])) {
      return `请输入正确的${placeholder}，请勿使用敏感字符：${isInSensitiveList(temp[i])}`;
    } else if (isChina === 1) {
      if (!/^([\u4e00-\u9fa5][\.|\·|\∙|\•|\・]?)*[\u4e00-\u9fa5]$/.test(temp[i])) {
        return `请输入正确的中文${placeholder}`;
      } else if (temp[i].length > 50) {
        return `${placeholder}至多50个汉字`;
      }
    } else if (isChina === 2) {
      if (!/^[a-zA-Z]+\/[a-zA-Z]+$/.test(temp[i])) {
        return `请输入正确的英文${placeholder}，英文${placeholder}格式为zhang/san`;
      }
    } else {
      if (!/^[a-zA-Z]+\/[a-zA-Z]+$/.test(temp[i]) && !/^[\u4e00-\u9fa5]+$/.test(temp[i])) {
        return `${placeholder}只能为中文或英文，英文${placeholder}格式为zhang/san`;
      }
    }
  }
  return false;
}

/**
 * 是否是用户名
 * @param  {[type]}  str [description]
 * @return {Boolean}     [description]
 */
export default function assertName(str, placeholder = '姓名'){
  let errorMsg = isNameNotValid(str, 1, placeholder);
  if(errorMsg){
    throw new Error(errorMsg);
  }
}


