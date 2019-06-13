import Mixin from './mixin'
import Listener from './listener'
import Emitter from './emitter'
import Messager from './messager'
import validate from './validate'
import tip from './tip'

export default class VueIframeMessager {
    constructor({ role, alias = 'messager', vuex, options }) {
        if (!validate(role, options)) return
        this.alias = alias
        this[alias] = new Messager(role, options)
        this.emitter = new Emitter(vuex)
        this.listener = new Listener(this[alias], this.emitter)
    }
    install(Vue) {
        Vue.prototype['$' + this.alias] = this[this.alias]
        Vue.prototype.$vueIframeMessager = this
        Vue.mixin(Mixin(this.alias))
    }
}