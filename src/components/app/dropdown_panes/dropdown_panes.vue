<template>
  <div class="dropdown-panes-wrapper">
    <div class="dropdown-navs-wrapper">
      <div
        class="mask"
        v-if="activedUID != -1"
        :style="{ height: screenHeight + 'px' }"
        @click="hide"
      ></div>
      <ul class="dropdown-navs" v-if="panes.length > 0">
        <li
          v-for="pane in panes"
          v-if="pane && pane.label"
          :key="pane._uid"
          :class="[
            'dropdown-nav',
            { active: pane._uid == activedUID },
            { colorful: pane.colorful },
          ]"
          :style="{ width: (1 / panes.length) * 100 + '%' }"
          @click="toggle(pane)"
        >
          <div v-html="pane.label" class="dropdown-nav-inner"></div>
        </li>
      </ul>
    </div>
    <div class="dropdown-panes" ref="panes">
      <h1 style="position: absolute; text-indent: -9999px;">非房预售</h1>
      <slot></slot>
      <div
        class="mask"
        v-if="activedUID != -1"
        :style="{ height: paneMaxHeight + 'px' }"
        @click="hide"
      ></div>
    </div>
  </div>
</template>
<script>
/**
 * 下拉展开面板
 *
 * ```jsx
 *   <app-dropdown-panes>
 *     <app-dropdown-pane label="pala pala">
 *       pane content here...
 *     </app-dropdown-pane>
 *   </app-dropdown-panes>
 * ```
 */
export default {
  name: 'app-dropdown-panes',
  data() {
    return {
      panes: [],
      // 高亮的uid
      activedUID: -1,
      // 标识此组件，子组件获取用
      // @see dropdown_pane.vue getParentPane()
      _identity: 'dropdown-panes',
      // 面板的最大高度。
      paneMaxHeight: 0,
      screenHeight: 0,
      paneOffsetTop: 0,
    };
  },
  methods: {
    /**
     * 展开或者关闭面板
     * @param  {[type]} pane [description]
     * @return {[type]}      [description]
     */
    toggle(pane) {
      this.activedUID = this.activedUID == pane._uid ? -1 : pane._uid;
      this.$emit('toggle', this.activedUID != -1, pane);
      if (this.activedUID != -1) {
        this.resetMaxHeight();
      }
    },
    /**
     * 收起所有面板
     * @return {[type]} [description]
     */
    hide() {
      this.activedUID = -1;
    },
    /**
     * 添加面板
     */
    addPane(pane, oldVal) {
      let isExists = false,
        i = 0;
      // 去重，组件不能有相同的label
      for (; i < this.panes.length; i++) {
        let _pane = this.panes[i];
        if (
          _pane &&
          _pane.label &&
          (pane.label == _pane.label || (oldVal && oldVal == _pane.label))
        ) {
          isExists = true;
          break;
        }
      }

      // 有则替换
      if (isExists) {
        this.panes.splice(i, 1, pane);
      }
      // 无则追加
      else {
        if (pane.index >= 0) {
          if (this.panes.length <= pane.index) {
            this.panes.length = pane.index + 1;
          }
          this.panes.splice(pane.index, 1, pane);
        } else {
          this.panes.push(pane);
        }
      }
    },
    /**
     * 设置面板最大高度
     */
    resetMaxHeight() {
      this.screenHeight = document.body.clientHeight;
      let offsetTop = this.$refs['panes'].offsetTop;
      this.paneOffsetTop = offsetTop;
      let height = this.screenHeight - offsetTop;
      this.paneMaxHeight = height;
    },
  },
};
</script>
<style scoped>
.dropdown-panes-wrapper {
  color: #333;
}
.dropdown-navs {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  height: 41px;
  position: relative;
}
.dropdown-navs .dropdown-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.dropdown-navs >>> .active {
  color: #23beae;
}
.dropdown-navs .dropdown-nav-inner {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 12px;
  position: relative;
  padding-left: 5px;
}
.dropdown-navs .dropdown-nav-inner::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAANCAMAAACae25RAAAAP1BMVEX//v6ZmZn9/Pzc29vMy8vJyMi6urrT09PPzs7GxcXDw8PBwMDX1tbR0NC9vLy3t7ebm5vi4eGzs7OgoKCenp6+0WyiAAAAa0lEQVQY03XMVxKAIBAD0CxFsNf7n9UAojCM+WDJmwX8RK97Q4fGJZuudRI50YlI5Y4wQq0c06cza6cAFfZdVs+yUB+fk5rwAzX6wuLBWF4G5KiR1QA9R48iA8HGo9S0mJ7UsUE9mhjZ3FtuPJoB8Wa2veYAAAAASUVORK5CYII=);
  background-size: 9px 4px;
  width: 9px;
  height: 4px;
  transition: all 0.25s ease;
  transform: rotate(0deg);
}
.dropdown-navs .dropdown-nav.active .dropdown-nav-inner::after {
  transform: rotate(180deg);
}
.dropdown-panes {
  position: relative;
  width: 100%;
  z-index: 1;
}
.dropdown-panes .mask {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  right: 0;
  height: 1000px;
}
.dropdown-navs-wrapper .mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1000px;
}
</style>
