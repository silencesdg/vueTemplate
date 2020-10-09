/**
 * 该方法最多执行多少秒
 */

export default (promise, time = 5000) => {
  return Promise.race([
    promise,
    new Promise((res, rej) => {
      setTimeout(() => rej(new Error('promise exec timeout.')), time)
    })
  ])
}
