/**
 * 基础信息（分页和一些杂项的处理，未分类的参数都需要放在这里）
 *
 * @module store/search/basic
 */
import _ from 'lodash';

export default {
  namespaced: true,
  state() {
    return {
      // 第几页
      pageIndex: 1,
      // 每页显示几条。
      pageSize: 10,
      // 总数
      total: -1,
      // 是否需要筛选项，用于列表页首次加载时获取筛选选项使用。
      // 0不需要，1需要
      needFilterFacet: 1,
    };
  },
  getters: {
    // 搜索参数
    params(state, getters) {
      let params = {
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
      };
      return params;
    },
    // url参数
    urlParams(state, getters) {
      return {};
    },
  },
  mutations: {
    set(state, params = {}) {
      for (let key in params) {
        state[key] = parseInt(params[key]);
      }
    },
    /**
     * 重置，用于首次加载。
     * @param  {[type]} state [description]
     * @return {[type]}       [description]
     */
    reset(state, needFilterFacet = true) {
      state.pageIndex = 1;
      state.total = -1;
      state.needFilterFacet = needFilterFacet ? 1 : 0;
    },
  },
  actions: {
    async init({ state, dispatch }) {
      console.log('basic init......');
    },
    async initByRoute({ state, rootState, commit }) {},
  },
};
