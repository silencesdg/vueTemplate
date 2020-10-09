import Vue from "vue";
export default {
  async login({ state, getters, commit, dispatch }, silence = true) {
    if (getters.isLogin) {
      return;
    }
    let userinfo = {};
    commit("setUser", userinfo);
  },

  async tryLogin({ state, getters, commit, dispatch }, silence = true) {
    if (getters.isLogin) {
      return;
    }
    let userinfo = {};
    commit("setUser", userinfo);
  }
};
