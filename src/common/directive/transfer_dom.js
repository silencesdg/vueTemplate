/**
 * v-transfer-dom指令
 *
 * 在移动端应用里，为了便于代码组织，通常我们要将组件放在各个路由的 .vue 文件里，但是因为此
 * 时组件并不在 body 下，加上定位，overflowscrolling 设置等原因，会出现遮罩在弹层之上，
 * z-index 失效等问题。
 *
 * 因此我们推荐在纯弹窗类组件比如 Alert Popup XDialog 等组件上使用 v-transfer-dom 实现
 * 自动移动到 body 下，解决以上问题。
 *
 * @see https://doc.vux.li/zh-CN/directives/v-transfer-dom.html
 * @see https://github.com/airyland/vux/blob/957d687e10f492d577133c33f002d3b2b780fe1f/src/directives/transfer-dom/index.js
 */

// Thanks to: https://github.com/calebroseland/vue-dom-portal

import objectAssign from 'object-assign'
/**
 * Get target DOM Node
 * @param {(Node|string|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */
function getTarget(node) {
    if (node === void 0) {
        return document.body
    }

    if (typeof node === 'string' && node.indexOf('?') === 0) {
        return document.body
    } else if (typeof node === 'string' && node.indexOf('?') > 0) {
        node = node.split('?')[0]
    }

    if (node === 'body' || node === true) {
        return document.body
    }

    return node instanceof window.Node ? node : document.querySelector(node)
}

function getShouldUpdate(node) {
    // do not updated by default
    if (!node) {
        return false
    }
    if (typeof node === 'string' && node.indexOf('?') > 0) {
        try {
            const config = JSON.parse(node.split('?')[1])
            return config.autoUpdate || false
        } catch (e) {
            return false
        }
    }
    return false
}

const directive = {
    inserted(el, { value }, vnode) {
        el.className = el.className ? el.className + ' v-transfer-dom' : 'v-transfer-dom'
        const parentNode = el.parentNode
        var home = document.createComment('')
        var hasMovedOut = false

        if (value !== false) {
            parentNode.replaceChild(home, el) // moving out, el is no longer in the document
            getTarget(value).appendChild(el) // moving into new place
            hasMovedOut = true
        }
        if (!el.__transferDomData) {
            el.__transferDomData = {
                parentNode: parentNode,
                home: home,
                target: getTarget(value),
                hasMovedOut: hasMovedOut
            }
        }
    },
    componentUpdated(el, { value }) {
        const shouldUpdate = getShouldUpdate(value)
        if (!shouldUpdate) {
            return
        }
        // need to make sure children are done updating (vs. `update`)
        var ref$1 = el.__transferDomData
        // homes.get(el)
        var parentNode = ref$1.parentNode
        var home = ref$1.home
        var hasMovedOut = ref$1.hasMovedOut // recall where home is

        if (!hasMovedOut && value) {
            // remove from document and leave placeholder
            parentNode.replaceChild(home, el)
            // append to target
            getTarget(value).appendChild(el)
            el.__transferDomData = objectAssign({}, el.__transferDomData, { hasMovedOut: true, target: getTarget(value) })
        } else if (hasMovedOut && value === false) {
            // previously moved, coming back home
            parentNode.replaceChild(el, home)
            el.__transferDomData = objectAssign({}, el.__transferDomData, { hasMovedOut: false, target: getTarget(value) })
        } else if (value) {
            // already moved, going somewhere else
            getTarget(value).appendChild(el)
        }
    },
    unbind: function unbind(el, binding) {
        el.className = el.className.replace('v-transfer-dom', '')
        if (el.__transferDomData.hasMovedOut === true) {
            el.__transferDomData.parentNode && el.__transferDomData.parentNode.appendChild(el)
        }
        el.__transferDomData = null
    }
}

export default directive
