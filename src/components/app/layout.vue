<template>
  <div class="app-layout" :style="{'padding-top': statusBarHeight}">
    <slot></slot>
  </div>
</template>
<script>
/**
 * layout，常配合 header/content/footer使用。
 *
 * ```jsx
 * <app-layout>
 *   <app-header></app-header>
 *   <app-content></app-content>
 *   <app-footer></app-footer>
 * </app-layout>
 * ```
 *
 * 目前只支持头部置顶这种样式显示。
 *
 * props:
 *
 * - {@todo} mode [String]('standard') 模式：
 *   - standard 标准模式，总是置顶，即fixed
 *   - scroll 滚动模式，滚动跟随，即static
 *   - shutter 卷帘门模式，顺势滚动隐藏，逆势滚动显示，常在需要显示更多列表信息时使用。
 *   - transiton 渐变模式，即滚动指定距离，背景从透明色变成完全不透明。滚动的距离由属性
 *     transitionDistance指定。在触发滚动模式时，会追加类名transition-enter。ue
 */
import Vue from "vue";
const { platform, tcbridge } = Vue.$utils;

export default {
  name: "app-layout",
  data() {
    return {
      statusBarHeight: 0
    };
  },
  async mounted() {}
};
</script>
<style scoped>
.app-layout {
  height: 100%;
  width: 100%;
  background: #fff;
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
</style>
