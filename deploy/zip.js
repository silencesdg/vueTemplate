/**
 * 压缩文件夹
 * https://www.npmjs.com/package/archiver
 * @module zip
 */
const fs = require("fs");
const archiver = require("archiver");
const path = require("path");
const staticPath = path.join(process.cwd(), "dist");
const tmpPath = path.join(process.cwd(), "ziptemp");
const isup = true;
/**
 * 压缩指定文件夹
 * @param  {String} source 源文件夹
 * @param  {String} dest   目标文件
 * @return {Boolean}       是否压缩成功
 */

module.exports = async (
  source = staticPath,
  dest = path.join(tmpPath, "static.zip")
) => {
  return new Promise((res, rej) => {
    let output = fs.createWriteStream(dest);
    let zip = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      res(true);
    });

    output.on("error", e => {
      rej(e);
    });

    zip.pipe(output);

    if (isup) {
      zip.directory(source, false);
    } else {
      let files = fs.readdirSync(source);
      if (files) {
        //遍历读取到的文件列表
        for (let n = 0; n < files.length; n++) {
          let filename = files[n];
          let filedir = path.join(source, filename);
          //根据文件路径获取文件信息，返回一个fs.Stats对象
          let stats = fs.statSync(filedir);

          let isFile = stats.isFile(); //是文件
          let isDir = stats.isDirectory(); //是文件夹
          if (isFile) {
          } else {
            console.log("source, filename", filedir, filename);
            zip.directory(filedir, filename);
          }
        }
      }
    }
    zip.finalize();
  });
};
