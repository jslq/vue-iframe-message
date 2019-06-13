import { tip, wrongRole} from './tip'

export const noDef = function(arg) {
    return arg === undefined || arg === '' || (Object.prototype.toString.call(arg) === '[object Object]' && Object.keys(arg).length === 0)
}

export default function(role, options) {
    if (noDef(role) || noDef(options) || noDef(options.window)) {
        console.error(tip)
        return false
    }
    if (!~['parent', 'iframe'].indexOf(role)) {
        console.error(wrongRole)
        return false
    }
    return true
}