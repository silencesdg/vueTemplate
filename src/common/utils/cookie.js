import Cookie from 'js-cookie'

export default {
    ...Cookie,
    set(name, value, options) {
        if (options && options.expiresInSeconds) {
            options.expires = options.expiresInSeconds / (24 * 3600)
            delete options.expiresInSeconds
        }
        Cookie.set(name, value, options)
    }
}