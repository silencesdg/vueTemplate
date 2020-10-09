export default {
  http: {
    baseURL: window.__SITE_ROOT__,
    // 是否开启防劫持
    avoidHijacking: true,
    responseType: "json",
    timeout: 3000
  },
  // 打点配置，见~/utils/trap
  trap: {
    domain: "",
    wxParams: {},
    webParams: {}
  },

  // 分享设置
  share: {
    defaultOptions: {
      title: "title",
      desc: "desc",
      img: ""
    }
  }
};
