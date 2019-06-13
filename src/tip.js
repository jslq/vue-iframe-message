export const tip = `
参数错误： 请参考下方格式或文档

Vue.use(new VueIframeMessager({
    role: 'iframe' || 'parent',  //必填
    vuex: {

    },
    options: {
        window: window,  //window对象,必填
        origin: process.env.LOCAL_ORIGIN //vue-cli3中
    }
}))
`

export const wrongRole = `
role参数必填
如果是iframe，则传入 "iframe"
如果是父窗口，则传入 "parent"
`

export const roleParent = `
当前role = 'parent'
请传入options的iframeId
`

export const roleIframe = `
当前role = 'iframe'
请传入options的window
`

export const noIdEle = `
当前options.iframeId不存在，请传入正确的id
`

export const listernFn = (key) => {
    return `
    messager的属性${key}必须是function
    `
}