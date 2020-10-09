<template>
  <div class="app-content">
    <slot></slot>
  </div>
</template>
<style scoped>
  .app-content{flex: 1; overflow-y: scroll; -webkit-overflow-scrolling: touch;}
  .app-content::-webkit-scrollbar-thumb {background-color: #c1c1c1; }
</style>
<script>
  export default {
    name: 'app-content'
  }
</script>
