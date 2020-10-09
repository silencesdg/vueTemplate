/**
 * 搜索、筛选
 *
 * - 处理搜索参数，搜索的动作由store/list完成。
 * - 处理筛选项的获取和外显。
 *
 * 包含以下子模块
 *
 * - city 城市
 * - keyword 关键词
 * - orderby 排序
 * - star 星级
 * - day 天数（通用筛选，对应搜索xxx）
 * - type 套餐类型
 * - basic 基础信息，未分类的搜索参数都在这里
 *
 * 每个子组件可能有:
 *
 * - getters
 *   - params 搜索使用的参数
 *   - urlParams url使用的参数
 *   - selectedOptions 可选，已选中的选项
 * - mutations
 *   - set(state, item)
 *   - reset(state, item)
 * - actions
 *   - init()
 *   - initByRoute()
 *
 * 主模块负责聚合子模块的属性（例如：params、urlParams、selectedOptions），调度子模块的
 * 方法（例如：set, reset, init, initByRoute).
 *
 * tips:
 *
 * - 为了减少参数的转换，所以数据格式、命令都跟接口的一致。
 * - 如果搜索部分要抽象成跟酒店频道一致的，那么应该使用酒店频道的，然后在api层进行数据转换。
 *
 * @module store/search
 */
import Vue from 'vue';
import _ from 'lodash';
const { formateParams } = Vue.$utils;
const CHILD_MODULES = [
  'basic',
  'city',
  'keyword',
  'orderby',
  'star',
  'day',
  'type',
];
import basic from './basic';
import city from './city';
import keyword from './keyword';
import orderby from './orderby';
import star from './star';
import day from './day';
import type from './type';

export default {
  namespaced: true,
  state() {
    return {
      searchId: 1001,
      searchName: 'search-name',
    };
  },
  getters: {
    // 搜索参数
    params(state, getters, rootState, rootGetters) {
      console.log(
        'params:',
        formateParams.camelCase(
          formateParams.cleanly(
            combineGetters('params', getters, CHILD_MODULES)
          )
        )
      );
      return formateParams.camelCase(
        formateParams.cleanly(
          combineGetters('params', getters, CHILD_MODULES)
        )
      );
    },
    // url参数
    urlParams(state, getters, rootState, rootGetters) {
      let oriPrams = formateParams.cleanly(
        combineGetters('urlParams', getters, CHILD_MODULES)
      );
      let params = {};
      for (let key in oriPrams) {
        if (oriPrams.hasOwnProperty(key)) {
          let value = oriPrams[key];
          if (_.isObject(value)) value = JSON.stringify(value);
          params[key] = value;
        }
      }
      console.log(11111, 'urlParams:', params);
      return params;
    },
    // 已选选项
    selectedOptions(state, getters, rootState, rootGetters) {
      let selectedOptions = [];
      // 获取子模块的已选选项。
      for (let i = 0; i < CHILD_MODULES.length; i++) {
        let options =
        getters[CHILD_MODULES[i] + '/selectedOptions'];
        if (options && options.length > 0) {
          selectedOptions = selectedOptions.concat(options);
        }
      }
      console.log(11111, 'selectedOptions:', selectedOptions);
      return selectedOptions;
    },
  },
  actions: {
    /**
     * 初始化所有模块
     * ** client only **
     * @return {[type]} [description]
     */
    async init({ state, getters, commit, dispatch }) {
      let promises = [];
      for (let i = 0; i < CHILD_MODULES.length; i++) {
        let mod = CHILD_MODULES[i];
        promises.push(dispatch(`${CHILD_MODULES[i]}/init`));
        // if (store.has('dispatch', `${namespace}/${mod}`, 'init')) {
        //   promises.push(store.once('dispatch', `${namespace}/${mod}`, 'init'));
        // }
      }
      return Promise.all(promises);
    },
  },
  modules: {
    basic,
    city,
    keyword,
    orderby,
    star,
    day,
    type,
  },
};

/**
 * 合并getters
 */
function combineGetters(name, getters, mods) {
  let rst = {};
  let filterItems = {}
  for (let i = 0; i < mods.length; i++) {
    let key = [mods[i], name].join('/');
    if (getters[key]) {
      rst = _.extend({}, rst, getters[key]);
      if(getters[key].filterItems) {
        filterItems = {...filterItems, ...getters[key].filterItems}
      }
    }
  }
  if(!(Object.keys(filterItems).length === 0)) {
    rst.filterItems = filterItems
  }
  return rst;
}
