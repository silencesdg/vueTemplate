<template>
  <div class="app-footer" ref="footer" :style="{'height': height + 'px'}">
    <slot></slot>
  </div>
</template>
<script>
  /**
   * app底栏
   */
  export default {
    name: 'app-footer',

    props: {
      height: {
        type: Number,
        default: 48,
      },
    }
  }
</script>
<style scoped>
  .app-footer{
    height: 48px;
    padding-bottom: 0px;
    /* 兼容 iphonx X系列的底部手势区 https://zhuanlan.zhihu.com/p/50178283*/
    padding-bottom: calc(env(safe-area-inset-bottom) + 0px);
  }
</style>
