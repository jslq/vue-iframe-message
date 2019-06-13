import { prefix } from './messager'

export default class VueIframeMessagerListener {
    constructor(messager, emmiter) {
        this.messager = messager
        this.emmiter = emmiter
        this.register()
    }
    register() {
        this.messager.receiver.addEventListener('message', (event) => {
            const { data: eventData = {} } = event
            let { type = '', data } = eventData
            if (!!~type.indexOf(prefix)) {
                type = type.split('-')[1]
                this.emmiter.emit(type, data)
            } else {
                return 
            }
        })
    }
}