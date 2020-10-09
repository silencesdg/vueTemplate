/**
 * 上传静态文件
 *
 * - 上传至jscdn
 * - publicpath: https://js.40017.cn/cn/h/minsu/v1/
 * @module upload
 */
const axios = require("axios");
const formData = require("form-data");
const fs = require("fs-extra");

module.exports = async file => {
  // 1. 检测是否存在文件
  if (
    !(await fs
      .ensureFile(file)
      .then(() => true)
      .catch(e => false))
  ) {
    throw new Error(`上传的文件不存在:${file}`);
  }

  // 准备上传数据
  let url, data, config;

  return await axios.post(url, data, config).then(rst => {
    if (rst.data.code == 0) {
      return true;
    } else {
      throw new Error(rst.data.msg);
      return false;
    }
  });
};
