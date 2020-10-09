/**
 * 搜索列表页 - 管理列表页房源列表和分页查询。
 *
 * - 保存和处理当前搜索结果的列表和分页相关信息。
 * - 搜索参数由store/search维护。
 *
 * @module store/list
 *
 */
import Vue from 'vue';
import _ from 'lodash';

export default {
  namespaced: true,
  state() {
    return {
      // 列表实体
      list: [],
      // 总条目
      totalCount: 0,
      // 总页数
      totalPage: 0,
      // 当前哪一页(0表示尚未有内容加载。)
      currentPage: 1,
      // 是否正在加载中
      isLoading: true,
      // 请求发生错误
      isError: false,
      // 是否是空搜
      emptyFilter: false,
    };
  },
  getters: {
    // 是否是重新加载
    isReloading(state, getters, rootState, rootGetters) {
      return rootState['search']['basic'].pageIndex == 1 && state.isLoading;
    },
    // 结果集为空
    isEmpty(state, getters) {
      return state.totalCount == 0;
    },
    // 结果已经见底
    isEnd(state) {
      return (state.currentPage-1) == state.totalPage && state.totalPage > 0;
    },
    // 搜索参数
    params(state, getters, rootState, rootGetters) {
      return rootGetters['search/params'];
    },
  },
  mutations: {
    /**
     * 显示加载中
     */
    showLoading(state) {
      state.isLoading = true;
    },
    /**
     * 隐藏加载中
     */
    hideLoading(state) {
      state.isLoading = false;
    },
    /**
     * 显示错误提示
     */
    showError(state) {
      state.isError = true;
    },
    /**
     * 隐藏错误提示
     */
    hideError(state) {
      state.isError = false;
    },
    /**
     * 重载
     */
    reload(
      state,
      {
        list = [],
        totalCount = 0,
        totalPage = 0,
        currentPage = 1,
        emptyFilter = false,
      }
    ) {
      console.log('reload:', list, totalCount, totalPage, emptyFilter);
      state.list = list;
      state.totalCount = totalCount;
      state.totalPage = totalPage;
      state.currentPage = currentPage;
      state.emptyFilter = emptyFilter;
    },
    /**
     * 加载更多
     */
    loadMore(
      state,
      { list = [], totalCount = 0, totalPage = 0, currentPage = 1 }
    ) {
      state.list = state.list.concat(list);
      state.totalCount = totalCount;
      state.totalPage = totalPage;
      state.currentPage = currentPage;
    },
    /**
     * 清空页面列表信息
     */
    clear(state) {
      state.list = [];
      state.totalCount = 0;
      state.totalPage = 0;
      state.currentPage = 1;
      state.isError = false;
      state.emptyFilter = false;
    },
    /**
     * 设置页面基础信息
     * @param {[type]} state  [description]
     * @param {Object} params [description]
     */
    set(state, params = {}) {
      for (let key in params) {
        state[key] = params[key];
      }
    },
  },
  actions: {
    /**
     * 根据筛选条件，重新获取列表
     * @param {Boolean} isRerender 是否重新加载，重新加载时，会重新获取和初始化筛选项。
     */
    async reload({ state, commit, dispatch }, isRerender = false) {
      // 重置分页信息
      commit('search/basic/reset', isRerender, { root: true });
      // 进行搜索
      await dispatch('search');
    },
    /**
     * 加载更多
     */
    async loadMore(
      { commit, dispatch, state, getters },
      needFilterFacet = false
    ) {
      if (state.isLoading) return;
      if (state.currentPage > state.totalPage) return;

      commit(
        'search/basic/set',
        {
          pageIndex: state.currentPage,
          needFilterFacet: needFilterFacet ? 1 : 0,
        },
        { root: true }
      );
      await dispatch('search', false);
    },
    /**
     * 进行搜索，分发结果（列表和筛选条目）。
     * @param  {Boolean} isReload     是否是加载更多这种形式，这种形式下，结果集将
     *                                  追加到列表中，而不是进行替换。
     */
    async search(
      { state, commit, dispatch, getters, rootGetters, rootState },
      isReload = true
    ) {
      if (state.isError) commit('hideError');
      let params = getters.params;
      if (params.cityId === 0) return;
      console.log('搜索接口请求参数：', params);
      if (isReload) {
        // 重新加载 - 清空数据 用于展示骨架图
        commit('clear');
      }
      // 1. 开始加载。
      commit('showLoading');
      let rst = await Vue.$api('searchList').getSearchList({
        ...params,
      });
      console.log('搜索接口返回接口：', rst);
      //  请求发生错误
      // setTimeout(() => {
      if (!rst) {
        //  请求发生错误
        if(state.list.length>0) {
          // 存在条数的时候
        }else {
          commit('clear');
          commit('showError', true);
        }
      }
      // 有结果
      else {
        let type = isReload ? 'reload' : 'loadMore',
          list = rst.collection || [],
          totalCount = rst.totalCount,
          totalPage = rst.totalPage,
          currentPage = rst.currentPage + 1,
          // resultType 0-正常召回  1-无结果推荐
          emptyFilter = rst.resultType === 1;

        commit(type, {
          list,
          totalCount,
          totalPage,
          currentPage,
          emptyFilter,
        });
        // 只在首次搜索时和有新总条目数及筛选项。
        if (isReload) {
          commit('search/basic/set', { total: totalCount }, { root: true });
        }
      }

      commit('hideLoading');
      // }, 1000);
    },
    /**
     * 进行搜索，分发结果（列表和筛选条目）。
     * @param  {Boolean} isReload     是否是加载更多这种形式，这种形式下，结果集将
     *                                  追加到列表中，而不是进行替换。
     */
    async getFilterList(
      { state, commit, dispatch, getters, rootGetters, rootState },
      isReload = true
    ) {
      let rst = await Vue.$api('searchList').getFilterList();
      if (rst) {
        let filterItems = _.get(rst, 'filterItems', []);

        let orderbys = filterItems.filter((item) => {
          return item.type === 1;
        });

        let stars = filterItems.filter((item) => {
          return item.type === 2;
        });

        let days = filterItems.filter((item) => {
          return item.type === 3;
        });

        let types = filterItems.filter((item) => {
          return item.type === 4;
        });

        // 排序
        if (orderbys.length > 0) {
          commit(
            'search/orderby/initOptions',
            {
              options: orderbys[0].items,
              isKeepSelected: true,
            },
            { root: true }
          );
        }

        // 星级
        if (stars.length > 0) {
          commit(
            'search/star/initOptions',
            {
              options: stars[0].items,
              isKeepSelected: true,
            },
            { root: true }
          );
        }

        // 天数
        if (days.length > 0) {
          commit(
            'search/day/initOptions',
            {
              options: days[0].items,
              isKeepSelected: true,
            },
            { root: true }
          );
        }

        // 套餐类型
        if (types.length > 0) {
          commit(
            'search/type/initOptions',
            {
              options: types[0].items,
              isKeepSelected: true,
            },
            { root: true }
          );
        }
      }
    },
  },
};
