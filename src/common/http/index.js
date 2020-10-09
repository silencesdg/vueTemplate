
import axios from 'axios'
import appConfig from '@/config'

const http = axios.create(appConfig.http)
http.defaults.withCredentials = true;
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    if (appConfig.isProd && config.url.indexOf('api/') < 0) {
        config.url = config.url.replace('-uat', '').replace('-qa', '')
    }
    if (process.env.VUE_APP_HTTP_API_ENV) {
        config.url = config.url.replace('api/', process.env.VUE_APP_HTTP_API_ENV)
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response && response.status == 200) {
        return response.data
    }
    return {
        data: response.data,
        status: response.status
    };
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


const install = (Vue, options) => {
    Vue.$http = Vue.prototype.$http = http
}

export default {
    install
}