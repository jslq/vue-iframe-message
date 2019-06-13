import { listernFn } from './tip'

export default class EventEmitter{
    constructor(vuex = {}){
        this.store = vuex.store
        this.actionPrefix = vuex.actionPrefix ? vuex.actionPrefix : 'MESSAGER_'
        this.mutationPrefix = vuex.mutationPrefix
        this.listeners = new Map()
    }

    addListener(event, callback, component){
        if (typeof callback === 'function'){
            if (!this.listeners.has(event)) this.listeners.set(event, [])
            this.listeners.get(event).push({ callback, component })
        } else {
            console.error(listernFn(event))
        }
    }

    removeListener(event, component){
        if (this.listeners.has(event)){
            const listeners = this.listeners.get(event).filter(listener => (
                listener.component !== component
            ))
            if (listeners.length > 0) {
                this.listeners.set(event, listeners)
            } else {
                this.listeners.delete(event)
            }
        }
    }

    emit(event, args){
        if(this.listeners.has(event)){
            this.listeners.get(event).forEach((listener) => {
                listener.callback.call(listener.component, args)
            })
        }
        this.dispatchStore(event, args)
    }

    dispatchStore(event, args){
        if(this.store && this.store._actions){
            let prefixed_event = this.actionPrefix + event;
            for (let key in this.store._actions) {
                let action = key.split('/').pop()
                if (action === prefixed_event) {
                    this.store.dispatch(key, args)
                }
            }

            if (this.mutationPrefix) {
                let prefixed_event = this.mutationPrefix + event
                for (let key in this.store._mutations) {
                    let mutation = key.split('/').pop()
                    if(mutation === prefixed_event) {
                        this.store.commit(key, args)
                    }
                }
            }
        }
    }
}