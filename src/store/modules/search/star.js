/**
 * 星级
 *
 * @module store/search/star
 */
import Vue from 'vue';
import _ from 'lodash';

export default {
  namespaced: true,
  state() {
    return {
      options: [
        {
          name: '经济',
          type: 2,
          value: 201,
          selected: false,
        },
        {
          name: '三星/舒适',
          type: 2,
          value: 202,
          selected: false,
        },
        {
          name: '四星/高档',
          type: 2,
          value: 203,
          selected: false,
        },
        {
          name: '五星/豪华',
          type: 2,
          value: 204,
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
            '2': values,
          },
        };
      } else {
        return {};
      }
    },
    // url参数
    urlParams(state, getters) {
      let params = {};
      if (getters.params.filterItems && getters.params.filterItems['2']) {
        params.star = getters.params.filterItems['2'];
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
          selectedOptions[i].module = 'star';
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
        throw new Error(`无效的星级值:${value}`);
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
      console.log('star init......');
      await dispatch('initByRoute');
    },
    async initByRoute({ state, rootState, commit }) {
      console.log('star initByRoute......');
      // let { star } = rootState.route.query;
      let star = Vue.$utils.getQuery(decodeURIComponent(location.href), 'star');
      if (star) {
        let options = star.split(',');
        for (let i = 0; i < options.length; i++) {
          commit('set', options[i]);
        }
      }
    },
  },
};
