/**
 * 关键词
 *
 * @module store/search/keyword
 */
import Vue from 'vue';
import _ from 'lodash';

export default {
  namespaced: true,
  state() {
    return {
      // 关键词元素，每个关键词元素会有一个表示类型的type属性：
      // - 'city' 设置城市，值在item.city
      // - 'label' 设置标签（区域位置），如果有城市先设置城市item.city，然后设置标签item.label
      // - 'text' 普通的关键词文本，值在item.text
      keyword:'',
      keywordItem: {},
    };
  },
  getters: {
    // 关键词文本，用于关键词文本框外显文本。
    keyword(state) {
      return state.keywordItem.type == 'text' ? state.keywordItem.text : '';
    },
    // 搜索参数
    params(state, getters) {
      return {
        keyWord: state.keyword
      };
    },
    // url参数
    urlParams(state, getters) {
      return {
        keyword: getters.keyword,
      };
    },
    // 已选择的选型
    selectedOptions(state, getters) {
      if (getters.keyword) {
        return [
          {
            module: 'keyword',
            text: getters.keyword,
            data: null,
          },
        ];
      } else {
        return [];
      }
    },
  },
  mutations: {
    set(state, value) {},
    setKeyword(state,params){
      console.log("jmxxxx",params)
      state.keyword = params
    },
    reset(state) {
      state.keyword = '';
    },
  },
  actions: {
    async init({ state, dispatch }) {
      console.log("keyword init......");
      await dispatch('initByRoute');
    },
    async initByRoute({ state, rootState, commit }) {
      console.log('keyword initByRoute......');
      // let { keyword } = rootState.route.query;
      let keyword = Vue.$utils.getQuery(decodeURIComponent(location.href), 'keyword');
      if (keyword) {
        commit('setKeyword', keyword);
      }
    },
  },
};
