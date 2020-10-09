<template>
  <div :class="['dropdown-pane', { active }]" :style="{ maxHeight, height }">
    <slot></slot>
  </div>
</template>
<script>
/**
 * 下拉展开模板
 *
 * 当该面板激活时，会触发'expanded'事件。
 *
 * @see dropdown_panes.vue
 */
export default {
  name: 'app-dropdown-pane',
  data() {
    return {
      // 父组件
      parent: null,
    };
  },
  props: {
    label: {
      type: String,
      default: '',
      required: true,
    },
    // 是否撑满整个标签。
    isFullbleed: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: -1,
    },
    colorful: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    active() {
      return this._uid == this.parent.activedUID;
    },
    maxHeight() {
      return this.active ? this.parent.paneMaxHeight - 115 + 'px' : 0;
    },
    height() {
      console.log('height:', this.isFullbleed ? this.maxHeight : 'auto');
      return this.isFullbleed ? this.maxHeight : 'auto';
    },
  },
  watch: {
    // 如果label值变更，同步到父组件。
    label(val, oldVal) {
      if (val == oldVal) return;
      this.addPane(val, oldVal);
    },
  },
  created() {
    this.parent = getParentPane(this);
    this.addPane(this.label);
    this.parent.$on('toggle', (expanded, pane) => {
      if (expanded && this.active) this.$emit('expanded');
    });
  },
  methods: {
    addPane(label, oldLabel) {
      this.parent.addPane(
        { _uid: this._uid, label, index: this.index, colorful: this.colorful },
        oldLabel
      );
    },
    /**
     * 关闭面板
     * @return {[type]} [description]
     */
    hide() {
      this.parent.hide();
    },
  },
};

/**
 * 获取父组件为dropdown-panes
 * @param  {Object} component vue component
 * @param  {String} name      组件的name名称，如果为设置，则返回null
 * @param  {Number} deep      向上溯源的层次限制。
 * @return {Object}           满足条件的父组件。
 */
function getParentPane(component, currentDeep = 0, deep = 3) {
  if (currentDeep >= deep) return null;
  let parent = component.$parent;
  if (parent.$data._identity != 'dropdown-panes') {
    parent = getParentPane(parent, currentDeep + 1, deep);
  }
  return parent;
}
</script>
<style scoped>
.dropdown-pane {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  overflow: hidden;
}
.dropdown-pane.active {
  z-index: 1;
  overflow: scroll;
}
</style>
