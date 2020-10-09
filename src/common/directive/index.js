
import keepScroll from './keep_scroll'
import scrollDirection from './scroll_direction'
import transferDom from './transfer_dom'
import trap from './trap'

// 自定义指令, 使用方式： v-keep-scroll, 写法参考 https://cn.vuejs.org/v2/guide/custom-directive.html
export default {
    'keep-scroll': keepScroll,
    'scroll-direction': scrollDirection,
    'transfer-dom': transferDom,
    'trap': trap
}