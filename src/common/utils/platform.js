/**
 * 平台的相关操作。
 *
 * ** 客户端运行only **
 * @module common/utils/platform
 */

let cachePlatformName;

export default {
  /**
   * 仅仅根据UA来判断是否是微信环境。
   * 比is('wx')更快速，用于最快的方式知晓平台环境，确定渲染样式，可用于服务端渲染。
   * @param {String} ua 当前的UA字符串。
   * @return {[type]} [description]
   */
  iswx(ua = "") {
    if (!ua && typeof window != "undefined") {
      ua = window.navigator.userAgent;
    }
    return /MicroMessenger/gi.test(ua);
  },
  /**
   * 当前页面是否运行在某某平台
   * @param  {String}  name
   *         - wxapp 小程序，小程序也在微信中，所以在此环境下is('wx') == true
   *         - wx 微信
   *         - [@todo]elong 艺龙酒店、艺龙旅行app
   *         - [@todo]tc 同程旅游app
   *         - [@todo]zhunar 住哪儿app 【无法区分】
   *         - web  普通web
   * @return {Boolean}      [description]
   */
  async is(name) {
    let pname = await this.name();
    if (name == "wx") {
      return pname == "wx" || pname == "wxapp";
    } else {
      return name == pname;
    }
  },

  /**
   * 获取当前平台的名字
   *
   * @return {String}
   *         - wxapp 微信小程序环境
   *         - wx 微信环境
   *         - [@todo]elong 艺龙酒店、艺龙旅行app
   *         - [@todo]tc 同程旅游app
   *         - [@todo]zhunar 住哪儿app (独立包、插件包)
   *         - web  普通web
   */
  async name() {
    if (cachePlatformName) return cachePlatformName;
    const ua = window.navigator.userAgent;

    // wx环境
    if (this.iswx(ua)) {
      // 判断是否在小程序中
      if (
        /miniProgram/gi.test(ua) ||
        window.__wxjs_environment === "miniprogram"
      ) {
        cachePlatformName = "wxapp";
      }
      // 在ios中没有miniProgram这个字段，需要调用wx bridgejs来判断
      else {
        let isWxapp = await new Promise((res, rej) => {
          if (wx && wx.miniProgram && wx.miniProgram.getEnv) {
            wx.miniProgram.getEnv(rst => {
              if (rst.miniProgram || rst.miniprogram) {
                res(true);
              } else {
                rej(false);
              }
            });
          } else {
            rej(false);
          }
        }).catch(e => false);
        cachePlatformName = isWxapp ? "wxapp" : "wx";
      }
    }
    // 默认web
    else {
      cachePlatformName = "web";
    }
    return cachePlatformName;
  },
  /**
   * 获取客户端操作系统名称
   * @return {[type]} 'ios', 'android', undefined
   */
  os() {
    let os;
    if (typeof window != "undefined") {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        os = "ios";
      } else if (/android/gi.test(navigator.userAgent)) {
        os = "android";
      } else {
        // unknow
      }
    }
    return os;
  }
};
