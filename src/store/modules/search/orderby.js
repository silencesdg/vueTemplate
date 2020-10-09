/**
 * 排序
 *
 * @module store/search/orderby
 */
import Vue from 'vue';
import _ from 'lodash';

export default {
  namespaced: true,
  state() {
    return {
      options: [
        {
          name: '智能排序',
          type: 1,
          value: 101,
          selected: true,
        },
        {
          name: '销量排序',
          type: 1,
          value: 102,
          selected: false,
        },
        {
          name: '低价优先',
          type: 1,
          value: 104,
          selected: false,
        },
        {
          name: '高价优先',
          type: 1,
          value: 105,
          selected: false,
        },
      ],
    };
  },
  getters: {
    // 搜索参数
    params(state, getters) {
      if (
        getters.selectedOption &&
        getters.selectedOption.value &&
        getters.selectedOption.value != 101
      ) {
        return {
          filterItems: {
            '1': [getters.selectedOption.value],
          },
        };
      } else {
        return {};
      }
    },
    // url参数
    urlParams(state, getters) {
      return {
        orderby: getters.selectedOption.value,
      };
    },
    // 选中的选型
    selectedOption(state) {
      return _.find(state.options, (option) => option.selected) || {};
    },
  },
  mutations: {
    set(state, value) {
      let flag = false;
      for (let i = 0; i < state.options.length; i++) {
        let option = state.options[i];
        option.selected = option.value == value;
        if (option.selected) flag = true;
      }
      if (!flag) {
        throw new Error(`无效的排序值:${value}`);
        state.options[0].selected = true;
      }
    },
    reset(state) {
      for (let i = 0; i < state.options.length; i++) {
        let option = state.options[i];
        option.selected = i == 0;
      }
    },
    /**
     * 初始化选项
     * @param {*} options  选项数组
     * @param {*} isKeepSelected 是否保留之前选中
     */
    initOptions(state, { options = [], isKeepSelected = false }) {
      if (options) {
        options[0].selected = true;
        state.options = options;
      }
    },
  },
  actions: {
    async init({ state, dispatch }) {
      console.log('orderby init......');
      await dispatch('initByRoute');
    },
    async initByRoute({ state, rootState, commit }) {
      console.log('orderby initByRoute......');
      // let { orderby } = rootState.route.query;
      let orderby = Vue.$utils.getQuery(decodeURIComponent(location.href), 'orderby');
      if (orderby) {
        commit('set', orderby);
      }
    },
  },
};
