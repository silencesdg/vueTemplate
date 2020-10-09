/**
 * 套餐类型
 *
 * @module store/search/type
 */
import Vue from 'vue';
import _ from 'lodash';

export default {
  namespaced: true,
  state() {
    return {
      options: [
        {
          name: '酒店',
          type: 4,
          value: 401,
          selected: false,
        },
        {
          name: '酒店+玩乐',
          type: 4,
          value: 402,
          selected: false,
        },
      ],
    };
  },
  getters: {
    // 搜索参数
    params(state, getters) {
      if (getters.selectedOptions && getters.selectedOptions.length > 0) {
        let values = [];
        for (let i = 0; i < getters.selectedOptions.length; i++) {
          if (getters.selectedOptions[i].value) {
            values.push(getters.selectedOptions[i].value);
          }
        }
        return {
          filterItems: {
            '4': values,
          },
        };
      } else {
        return {};
      }
    },
    // url参数
    urlParams(state, getters) {
      let params = {};
      if (getters.params.filterItems && getters.params.filterItems['4']) {
        params.type = getters.params.filterItems['4'];
      }
      return params;
    },
    // 选中项
    selectedOptions(state) {
      let selectedOptions = _.filter(
        state.options,
        (option) => option.selected
      );
      if (selectedOptions.length > 0) {
        for (let i = 0; i < selectedOptions.length; i++) {
          selectedOptions[i].module = 'type';
        }
      }
      return selectedOptions;
    },
  },
  mutations: {
    set(state, value) {
      let flag = false;
      for (let i = 0; i < state.options.length; i++) {
        let option = state.options[i];
        if (option.value == value) {
          option.selected = true;
        }
        if (option.selected) flag = true;
      }
      if (!flag) {
        throw new Error(`无效的套餐类型值:${value}`);
        state.options[0].selected = true;
      }
    },
    /**
     * 重置 - 全部/单个
     * @param {*} state
     * @param {*} option 单个选项
     */
    reset(state, option) {
      if (option) {
        for (let i = 0; i < state.options.length; i++) {
          if (option.value == state.options[i].value) {
            state.options[i].selected = false;
          }
        }
      } else {
        for (let i = 0; i < state.options.length; i++) {
          state.options[i].selected = false;
        }
      }
    },
    /**
     * 初始化选项
     * @param {*} options  选项数组
     * @param {*} isKeepSelected 是否保留之前选中
     */
    initOptions(state, { options = [], isKeepSelected = false }) {
      if (options) {
        state.options = options;
      }
    },
    /**
     * 同步选项
     * @param {*} state
     * @param {*} shownOptions
     */
    syncOptions(state, shownOptions) {
      state.options = shownOptions;
    },
  },
  actions: {
    async init({ state, dispatch }) {
      console.log('type init......');
      await dispatch('initByRoute');
    },
    async initByRoute({ state, rootState, commit }) {
      console.log('type initByRoute......');
      // let { type } = rootState.route.query;
      let type = Vue.$utils.getQuery(decodeURIComponent(location.href), 'type');
      if (type) {
        let options = type.split(',');
        for (let i = 0; i < options.length; i++) {
          commit('set', options[i]);
        }
      }
    },
  },
};
