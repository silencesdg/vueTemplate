<template>
  <div class="loadingbg" :class="{ bg: type != 'loading2' }">
    <div class="loading" :class="{ loadbg: type == 'loading2' }">
      <img v-if="type == 'loading2'" src class="loadingimg">
      <img v-else src class="loadingimg">
      <p
        class="loading_text"
        :style="{ color: type == 'loading2' ? '#fff' : '#999' }"
      >{{ txt ? txt : "努力加载中" }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["type", "txt"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.loadingbg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  left: 0;
  &.bg {
    background-color: #e9ecf1;
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 71px;
    height: 71px;
    .loading_text {
      font-size: 12px;
      margin-top: 12px;
      text-align: center;
    }
    .loadingimg {
      display: block;
      width: 36px;
      height: 36px;
      margin: 0 auto;
    }
    &.loadbg {
      background: rgba(0, 0, 0, 0.8);
      border-radius: 6px;
      width: 120px;
      height: 40px;
      display: flex;
      .loadingimg {
        margin: 0 8px 0 0;
      }
    }
  }
}
</style>
