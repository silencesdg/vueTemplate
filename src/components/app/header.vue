<template>
  <header class="app-header">
    <div class="header-inner">
      <div class="left" v-if="!hiddenLeft">
        <slot name="left">
          <div class="icon-back clickable-button" @click="goBack"></div>
        </slot>
      </div>
      <div
        class="title"
        :style="{ justifyContent: titleAlignContent }"
        v-if="!hiddenTitle"
      >
        <slot name="title">{{ title | filterTitle }}</slot>
      </div>
      <div class="right" v-if="!hiddenRight">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="header-bottom" v-if="$slots.bottom">
      <slot name="bottom"></slot>
    </div>
  </header>
</template>
<script>
/**
 * app顶部通栏
 *
 * props
 *
 * - title [String]('') 标题文本。
 * - titleAlign [String]('left') 标题对其方式
 * - hiddenTitle [Boolean](false) 是否隐藏标题
 * - hiddenLeft [Boolean](false) 是否隐藏左侧slot
 * - hiddenRight [Boolean](false) 是否隐藏右侧slot
 *
 * slot：
 *
 * - left 只兼容48*48的图标，不然title的位置有些问题。
 * - title 标题栏中间内容。
 * - right 右侧只兼容48*48图标，当大于这个尺寸时，title建议向左边靠奇。
 * - bottom
 *
 * @todo  app-header需要重构下，完成上述的几种模式。
 */
import Vue from "vue";
const { platform, tcbridge } = Vue.$utils;

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    titleAlign: {
      type: String,
      default: "center",
    },
    hiddenTitle: {
      type: Boolean,
      default: false,
    },
    hiddenLeft: {
      type: Boolean,
      default: false,
    },
    hiddenRight: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    titleAlignContent() {
      let alignContent = "flex-start";
      switch (this.titleAlign) {
        case "center":
          alignContent = "center";
          break;
        case "right":
          alignContent = "flex-end";
          break;
        case "left":
        default:
          alignContent = "flex-start";
      }
      return alignContent;
    },
  },
  filters: {
    filterTitle(title) {

      return title;
    },
  },
  methods: {
    goBack() {

        this.$router.goBack();
      
    },
  },
};
</script>
<style scoped>
.app-header {
  height: 44px;
  color: #23beae;
  background: #fff;
  box-sizing: border-box;
}
.app-header .header-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.app-header .title {
  height: 44px;
  line-height: 44px;
  color: #333;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 17px;
  color: #555;
  font-weight: bold;
}
.app-header .title > * {
  flex: 1;
}
.app-header .left {
  position: absolute;
  left: 0;
}
.app-header .right {
  position: absolute;
  right: 0;
}
.app-header >>> .icon-back {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAtCAMAAABoKeDXAAAAbFBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZnLvUXkAAAAI3RSTlMAlATmGTfHqZ1DJjvYxL5rWQ/uohLw79rJuYR7dWNiX4qJUC4+uF0AAAC/SURBVDjLldTZEoMgDIVhwRW1rtRq95b3f8c2ePszDrn9hmHICUkCpVQSJOeURtGV+1eFVDqpB9DYiZwNUHYSShsguwpNOVDdCl1qoDwVKrI4MpNQZ4EGJ1VqoKcLdqP3pIhunq5EH093IuWpJ5o9vcKZDJTJJrJEZlIXQm2eQO13fUHgHN2HaDfBySDy+7gv3E/GN+bA+R3nzvPCczZrRLMIdiNig3PNQ8//iGNZfSzxmfF/5z3B++V4L/E++wGM1x/ho5YJCgAAAABJRU5ErkJggg==)
    no-repeat center center;
  background-size: 9px 15px;
  display: block;
  width: 44px;
  height: 44px;
}
.app-header >>> .icon {
  width: 44px;
  height: 44px;
}
.app-header >>> .icon-close {
  background: url(../../assets/images/icon_close.png) no-repeat center center;
  background-size: 16px 16px;
}
</style>
