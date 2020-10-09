import qaConfig from './config.qa'
import prodConfig from './config.prod'
import defaultConfig from './config.default'
import _ from 'lodash'


let isProdPath = false
for (let i = 0; i < prodConfig.path.length; i++) {
    if (location.pathname.indexOf(prodConfig.path[i]) == 0) {
        isProdPath = true;
        break
    }
}

let isProdHost = false
for (let i = 0; i < prodConfig.hosts.length; i++) {
    if (location.host == prodConfig.hosts[i]) {
        isProdHost = true;
        break
    }
}

const isprod = isProdHost && isProdPath

const config = isprod ? _.defaultsDeep(prodConfig, defaultConfig) : _.defaultsDeep(qaConfig, defaultConfig)

const install = (Vue, options) => {
    Vue.$config = Vue.prototype.$config = config
}

// 注意 : config中不得配置 install选项，防止覆盖install函数
export default {
    install,
    ...config,
    isprod
}
