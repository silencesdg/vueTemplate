/**
 * 轨迹和事件统计模块
 *
 * 1. 在config.trap中信息配置：
 *   - enabled 是否开启。
 *   - wxParams 微信环境下的配置
 *   - webParams web环境下的配置
 *   - params 默认配置。
 * 2. 配合vue插件v-trap使用。见 ./plugin/trap
 * 3. 可在路由meta中配置show参数，页面调用是自动生成。
 *
 * ** client only **
 * @module utils/trap
 */
import _ from "lodash";
import MobileDetect from "mobile-detect";
import querystring from "query-string";
import cookies from "./cookie";
import platform from "./platform";
import storage from "./storage";
import delay from "./delay";
import Vue from "vue";
import config from "@/config";

const vgg = {
  cookies: cookies,
  utils: {
    storage: storage
  }
};

class Trap {
  constructor() {
    this.init();
    // 延迟发送， @see this.send()
    this.isDelaySend = true;

    Vue.mixin({
      beforeRouteEnter: (to, from, next) => {
        if (typeof window != "undefined") {
          let params, rf;
          if (to) {
            (params = _.get(to, "meta.trap")),
              (rf = _.get(from, "meta.trap.pt"));
            if (rf) {
              if (!params) {
                params = {};
              }
              params = {
                ...params,
                rf
              };
            }
          }
          if (params) {
            for (let key in params) {
              if (!params.hasOwnProperty(key)) continue;
              let param = params[key];
              if (param.indexOf(":") == 0) {
                param = param.substr(1, param.length);
                params[key] = to.params[param];
              } else if (param.indexOf("?") == 0) {
                param = param.substr(1, param.length);
                params[key] = to.query[param];
              }
            }

            this.show(params);
            let { pt } = params;
            if (pt) {
              this.set({ pt });
            }
          }
        }
        next();
      }
    });
  }
  /**
   * 初始化
   * - 基础数据
   * 基础配置
   * @return {[type]} [description]
   */
  init() {
    if (typeof window == "undefined") return;
    // 初始化：
    // - 客户端环境
    // - 用户信息
    // - 配置信息。
    this.baseinfo = {};
    this.initDeviceInfo();
    this.initUserInfo();
    this.initConfigInfo();
    this.initDefaultInfo();
  }
  /**
   * 根据设备信息初始化。
   */
  initDeviceInfo() {
    let baseinfo = {};
    let mDetect = new MobileDetect(window.navigator.userAgent);
    baseinfo.bns = 2;
    if (platform.iswx()) {
      baseinfo.ct = 4;
    } else {
      baseinfo.ct = 2;
    }
    baseinfo.dt = mDetect.mobile() == "iPhone" ? 1 : 3;
    baseinfo.md = mDetect.mobile();
    baseinfo.os = mDetect.os();
    // 获取分辨率
    baseinfo.bs = `${window.screen.width}*${window.screen.height}*${window.devicePixelRatio}`;
    // 获取网络类型
    // 0—unknown ,1-ethernet ,2-wifi ,3-2g ,4-3g ,5-4g，6-5g
    try {
      if (window.navigator.connection.effectiveType.indexOf("wifi") >= 0) {
        baseinfo.nt = 2;
      } else {
        baseinfo.nt = {
          "2g": 3,
          "3g": 4,
          "4g": 5,
          "6g": 6
        }[window.navigator.connection.effectiveType];
        if (!baseinfo.nt) baseinfo.nt = 0;
      }
    } catch (e) {
      baseinfo.nt = 0;
    }

    this.set(baseinfo);
  }
  /**
   * 初始化用户信息
   * @return {[type]} [description]
   */
  initUserInfo() {
    let baseinfo = {};
    this.set(baseinfo);
  }
  /**
   * 初始化配置信息。
   */
  initConfigInfo() {
    let baseinfo = {};

    // 不同平台有不同的chid。
    if (platform.iswx()) {
      baseinfo = { ...config.trap.wxParams };
    } else {
      baseinfo = { ...config.trap.webParams };
    }
    this.set(baseinfo);
  }
  /**
   * 初始化默认信息
   * @return {[type]} [description]
   */
  initDefaultInfo() {}
  /**
   * 设置基础信息。
   * @param {Object} baseinfo [description]
   */
  set(baseinfo) {
    if (!baseinfo) return;
    if (!this.baseinfo) this.baseinfo = {};
    this.baseinfo = Object.assign(this.baseinfo, baseinfo);
  }
  reset() {
    this.baseinfo.if = this.defaultIF;
  }
  /**
   * 发送数据
   * @param  {[type]} params [description]
   * @return {[type]}                [description]
   */
  async send(params = {}) {
    if (!params || typeof params != "object") return;

    // 页面首次进入时，进行延迟，因为项目站点的H5CookieId不在页面中，而在初始化接口中。
    if (this.isDelaySend) {
      // await vgg.utils.delay(1000);
      await delay(1000);
      this.isDelaySend = false;
    }
    // 发送打点请求，一般是请求一个像素大的gif图，续接上参数
  }
  capture({ type, params }) {
    params = {
      ...params,
      et: type
    };

    for (let key in params) {
      if (typeof params[key] == "object") {
        try {
          params[key] = JSON.stringify(params[key]);
        } catch (e) {}
      }
    }
    this.send(params);
  }
  show(params) {
    if (typeof params == "string") {
      params = { pt: params };
    }
    this.capture({
      type: "show",
      params: {
        ...params
      }
    });
  }
  click(params, pageName) {
    if (typeof params == "string") {
      params = { cspot: params };
    }
    if (typeof pageName == "string") {
      params = {
        ...params,
        pt: pageName
      };
    }
    this.capture({
      type: "click",
      params: {
        ...params
      }
    });
  }
  info(params) {
    this.capture({
      type: "info",
      params: {
        ...params
      }
    });
  }
}

const trap = new Trap();
export default trap;
