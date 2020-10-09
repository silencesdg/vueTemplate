<template>
  <div class="app-wrapper">
    <slot></slot>
  </div>
</template>

<style>
html {
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
body {
  width: 100%;
  background: #efeff4;
  height: 100%;
  overflow: hidden;
}
#app,
.app-wrapper {
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.app-wrapper {
  box-sizing: border-box;
  position: relative;
}
</style>
<script>
export default {};
</script>
