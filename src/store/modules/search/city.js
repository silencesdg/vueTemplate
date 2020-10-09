/**
 * 城市
 *
 * @module store/search/city
 */
import Vue from 'vue';

export default {
  namespaced: true,
  state() {
    return {
      cityId: 0,
      cityName: ''
    };
  },
  getters: {
    // 搜索参数
    params(state, getters) {
      let params = {
        cityId: state.cityId
      };
      return params;
    },
    // url参数
    urlParams(state) {
      let params = { ...state };
      return params;
    },
  },
  mutations: {
    set(state, value) {
      
    },
    setCity(state,params){
      state.cityId = params.cityId
      state.cityName = params.cityName
    },
    reset(state) {},
  },
  actions: {
    async init({ state, dispatch }) {
      console.log("city init......");
      await dispatch('initByRoute');
    },
    async initByRoute({ state, rootState, commit }) {
      console.log('orderby initByRoute......');
      // let { orderby } = rootState.route.query;
      let cityId = Vue.$utils.getQuery(decodeURIComponent(location.href), 'cityId') || Vue.$utils.getQuery(decodeURIComponent(location.href), 'cityid');
      let cityName = Vue.$utils.getQuery(decodeURIComponent(location.href), 'cityName') || Vue.$utils.getQuery(decodeURIComponent(location.href), 'cityname');
      if (!cityId) {
        let rst = await Vue.$api("citySelect").getCityList();
        if(rst.retcode === 0 && rst.body) {
          cityId = rst.body.defaultCityId || 2201;
          cityName = rst.body.defaultCityName || "三亚"
        }
      }
      commit('setCity', {
        cityId: cityId,
        cityName: cityName
      });
    },
  },
};
