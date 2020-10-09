<template>
  <div id="app">
    <app-wrapper>
      <transition :name="transitionName">
        <keep-alive :include="[]">
          <router-view class="router-view"></router-view>
        </keep-alive>
      </transition>
    </app-wrapper>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "@/common/css/common.css";

export default {
  data() {
    return {
      transitionName: "page-in"
    };
  },
  components: {
    appWrapper: () => import("@/components/app/wrapper.vue")
  }
};
</script>
>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
