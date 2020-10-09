/**
 * 部署静态文件
 *
 * - 压缩
 * - 上传至cdn
 *
 * @module deploy
 */
const path = require('path')
const zip = require('./zip')
const upload = require('./upload')
const clean = require('./clean')
const tmpPath = path.join(process.cwd(), 'ziptemp')

/**
 * 部署静态文件
 * @return {[type]} [description]
 */
async function deploy() {
  // clean tmp zip files.
  await clean(tmpPath)
  await zip()
  await upload(path.join(tmpPath, 'static.zip'))
  // clean tmp zip files
  await clean(tmpPath)

}

deploy()
  .then(() => {
    console.log('静态文件部署成功')
  })
  .catch(e => {
    console.log('静态文件部署失败', e)
    throw e
  })


