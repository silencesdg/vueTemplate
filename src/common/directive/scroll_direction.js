/**
 * 根据滚动方向来执行回调的指令。
 *
 * v-scroll-directive="scrollShotter"
 *
 * ```js
 *  {
 *    methods: {
 *      scrollShotter(down){
 *        if(down){
 *          // 向下滚动
 *        }else{
 *          // 向上滚动
 *        }
 *      }
 *    }
 *  }
 * ```
 */
import _ from 'lodash';

const throttlePx = 20;

export default {
    inserted(el, { value }, vnode) {
        if (!_.isFunction(value)) {
            throw new Error('v-scroll-directive need a function.');
        }
        if (el._scrollDirectiveFunction) return;
        el._lastScrollTop = 0;
        el._scrollDirectiveFunction = _.throttle((e) => {
            let top = el.scrollTop;
            let down = top > el._lastScrollTop;
            if ((down && top < el._lastScrollTop + throttlePx) || (!down && top > el._lastScrollTop - throttlePx)) {
                return;
            }

            el._lastScrollTop = top;
            value(down);
        }, 250);
        el.addEventListener('scroll', el._scrollDirectiveFunction, false);
    },
    componentUpdated(el, { value }) {

    },
    unbind: function unbind(el, binding) {
        el.removeEventListener('scroll', el._scrollDirectiveFunction, false);
    },
}