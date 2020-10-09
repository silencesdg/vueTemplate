<template>
  <div v-if="lazyload" class="app-img" v-lazy:background-image="{ src: webpUrl(src) }"></div>
  <div v-else class="app-img" :style="{ 'background-image': 'url(' + webpUrl(src) + ')' }"></div>
</template>
<script>
/**
 * @todo 图片支持大小自适应，裁切，懒加载，webp
 */
export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    lazyload: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    webpUrl() {
      return url => {
        return url;
      };
    }
  }
};
</script>
<style scoped>
.app-img {
  background-size: cover;
  opacity: 1;
  transition: all 0.26 ease;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
