import Vue from 'vue';

export default {
  /**
   * 注册全局指令
   *
   * 指令使用形式
   * v-trap:[事件类型]="{...params}"
   * - click 在click之后触发
   * - show 在mounted之后会触发
   * - info 在click之后触发
   *
   * 默认情况下 是 流量埋点
   *
   * 指令不推荐使用指定 click 事件
   */
  inserted(el, binding, vnode, oldNode) {
    const value = binding.value;
    const arg = binding.arg;
    const modifiers = binding.modifiers;
    if (arg == 'click' || arg == 'info') {
      el.addEventListener('click', () => {
        Vue.$utils.trap[arg](value);
      });
    } else if (arg == 'show') {
      Vue.$utils.trap.show(value);
    }
  },
};
