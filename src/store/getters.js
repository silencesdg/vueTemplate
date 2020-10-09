export default {
  isLogin(state, getters, rootState, rootGetters) {
    return !!state.user;
  }
};
