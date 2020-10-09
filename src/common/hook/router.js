export default (router, store) => {
  router.beforeEach(async (to, from, next) => {
    // if (to.meta && typeof to.meta.share == 'boolean' && !to.meta.share) {
    //   // do nothing
    //   // 由页面自定义分享数据，因为有些页面会变更url，这样会再次出发这里引起分享数据重置。
    //   // 所以当设置to.meta.share == false的时候，让路由不设置分享数据。
    // } else {
    //   store.commit('resetShare')
    //   if (to.meta && to.meta.share) {
    //     store.commit('setShare', to.meta.share)
    //   }
    // }

    // store.dispatch('tryLogin')
    next();
  });
};
