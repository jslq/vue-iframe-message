export default (alias) => {
    return {
        created() {
            if (this.$options[alias]) {
                Object.keys(this.$options[alias]).forEach(event => {
                    this.$vueIframeMessager.emitter.addListener(event, this.$options.messager[event], this)
                })
            }
        },
        beforeDestroy() {
            if (this.$options[alias]) {
                Object.keys(this.$options[alias]).forEach(event => {
                    this.$vueIframeMessager.emitter.removeListener(event, this)
                })
            }
        }
    }
}