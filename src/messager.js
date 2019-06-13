import { noDef } from './validate'
import { roleParent, roleIframe, noIdEle } from './tip'
export const prefix = 'JSLQ'

export default class Messager {
    constructor(role, options) {
        if (role === 'parent') {
            if (noDef(options.iframeId)) {
                return console.error(roleParent)
            }
            this.trigger = () => {
                return this.getIframeFromId(options.iframeId)
            }
            this.receiver = options.window
        }
        if (role === 'iframe') {
            this.trigger = options.window.parent
            this.receiver = options.window
        }
        this.options = options
    }
    getIframeFromId(id) {
        let iframe = document.getElementById(id)
        if (!iframe) {
            return console.error(noIdEle)
        }
        return iframe.contentWindow
    }
    send(type, data) {
        let trigger = typeof this.trigger === 'function' ? this.trigger() : this.trigger
        //TODO: 跨域的异常不能捕获,不能在异常的时候引导错误提示
        trigger.postMessage({
            type: `${prefix}-${type}`,
            data,
        }, this.options.origin)
    }
}