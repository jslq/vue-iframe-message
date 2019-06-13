### Vue-iframe-messager
> 基于vue(vuex)实现的可跨域iframe通信的插件,有问题联系QQ: 917498254,或者提issue

## 🚀 下载
``` bash
npm install @jslq/vue-iframe-messager --save
```

### 在iframe中使用
``` javascript
import Vue from 'vue'
import store from './store'
import VueIframeMessager from '@jslq/vue-iframe-messager'

Vue.use(new VueIframeMessager({
    role: 'iframe',
	vuex: {
        store,
        actionPrefix: "MESSAGER_",  //默认值就是这个
        mutationPrefix: "MESSAGER_" //没有默认值，需手动传入
	},
	options: {
		window: window,
        origin: process.env.VUE_APP_PARENT_ORIGIN  //在vue-cli3中可以存父窗口的origin，同域可以不传
	}
}))
```

### 在父窗口中使用
``` javascript
import Vue from 'vue'
import store from './store'
import VueIframeMessager from '@jslq/vue-iframe-messager'

Vue.use(new VueIframeMessager({
    role: 'parent',
	vuex: {
        store,
        actionPrefix: "MESSAGER_",  //默认值就是这个
        mutationPrefix: "MESSAGER_" //没有默认值，需手动传入
	},
	options: {
        iframeId: 'my-iframe'
        window: window,
        origin: process.env.VUE_APP_IFRAME_ORIGIN  //在vue-cli3中可以存父窗口的origin，同域可以不传
	}
}))
```

### 如何在组件中注册事件
```js
//a.vue in parent
export default {
    ...
    data() {
        return {
            got
        }
    },
    messager: { //如果alias 赋值则使用那个值，parent和iframe的alias保持一直
        //会自动注册type===selected的事件
        selected(data) {
            this.got = data //'haha'
        }
    }
    ...
}

//b.vue in iframe
export default {
    ...
    method: {
        handlerClick() {
            this.$messager.send('selected', 'haha')
        }
    }
    ...
}
```

**参数**|**类型**|**默认值**|**是否必传**|**描述**
-----|-----|-----|-----|-----
role|string|`null`|是|看上面
alias|string|`messager`|不是|如果用到vue插件也是以messager作为名字，为了防止冲突，可以起别名，不过一般不会有人用这个名字
vuex.store|Vuex|`null`|不是|Vuex store 实例
vuex.actionPrefix|String|`null`|不是|前缀
vuex.mutationPrefix|String |`null`|不是|前缀
options.iframeId|string|`null`|是|role是'parent'时必传
options.origin|string|`null`|是|role是'iframe'并且和父窗口跨域时必传
options.window|DOMElement|`null`|是|window对象

### 在vuex中使用
```
import Vue from 'vue'
import Vuex from 'vuex'
const prefix = 'MESSAGER_'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {
        `MESSAGER_${EVENT_NAME}`() {
            // do something
        }
    },
    actions: {
        `MESSAGER_${EVENT_NAME}`() {
            // do something
        }
    }
})
```

## 常见问题
### 父窗口mounted中调用this.$messager.send没有生效
虽然设置了origin，但是还是会有跨域问题，原因未知，不过可以用setTimeout延迟执行

### 提示跨域
报错信息 Failed to execute 'postMessage' on 'DOMWindow'，设置下options.origin 即可