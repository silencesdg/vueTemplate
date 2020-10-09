import testApi from "./testApi";
import _ from "lodash";

const api = {
  testApi
};

const install = (Vue, options) => {
  Vue.$api = Vue.prototype.$api = key => {
    const v = api[key];
    return _.isFunction(v) ? v(Vue.$http, Vue) : v;
  };
};

export default {
  install
};
