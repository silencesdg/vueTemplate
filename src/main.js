import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import directive from "./common/directive";
import plugins from "./common/plugins";
import VueLazyload from "vue-lazyload";
import hook from "./common/hook";

// 挂载一些东西，this.$xxx访问，或Vue.$xxx访问
Vue.use(VueLazyload, {
  loading: require("")
});

// 集成自定义指令
for (const key in directive) {
  if (directive.hasOwnProperty(key)) {
    Vue.directive(key, directive[key]);
  }
}

// 挂载插件，某些可以通过this.$xxx访问，或Vue.$xxx访问
plugins.map(plugin => {
  Vue.use(plugin);
});

hook(router, store);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
