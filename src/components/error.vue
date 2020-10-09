<template>
  <div class="errPage">
    <div class="errInfo">
      <div v-if="img">
        <img :src="img" class="topimg">
      </div>
      <div v-else>
        <img v-if="type == 'network'" src="@/assets/images/err_nomsg.png" class="topimg">
        <img v-else src="@/assets/images/err_network.png" class="topimg">
      </div>

      <p class="tip_text">
        {{
        txt != ""
        ? txt
        : type == "network"
        ? "该页面暂时无法打开"
        : "暂时没有内容哦"
        }}
      </p>
      <button class="retry_button" v-if="type == 'network'" @click="clickRefresh">点击刷新</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["type", "txt", "img"],
  data() {
    return {};
  },
  mounted() {
    this.$utils.trap.show("wrongpage");
  },
  methods: {
    clickRefresh() {
      console.log("刷新");
      this.$emit("tryRefresh");
    }
  }
};
</script>

<style lang="scss" scoped>
.errPage {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  left: 0;
  background-color: #e9ecf1;
  .errInfo {
    position: absolute;
    top: 30%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    width: 100%;
    height: 70%;
    .tip_text {
      font-size: 4.3vw;
      margin-top: 5vw;
      text-align: center;
      color: #b4bccc;
      font-family: PingFangSC-Regular;
    }
    .topimg {
      display: block;
      width: 32%;
      // height: 32%;
      margin: 0 auto;
    }
    .retry_button {
      display: block;
      color: #19293f;
      margin-left: 38%;
      font-family: PingFangSC-Semibold;
      border: 1px solid #a7acb7;
      border-radius: 1vw;
      margin-top: 5vw;
      background: transparent;
      width: 24.5vw;
      height: 7.47vw;
    }
  }
}
</style>
