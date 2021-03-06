/**
 *
 * @authors linteng (875482941@qq.com)
 * @date    2017-10-17 16:53:35
 */

import request from 'request'

var watch = function(obj, prop, cb){
    var oldVal = ''
    if(prop in obj){
        oldVal = obj[prop]
    }
    Object.defineProperty(obj, prop, {
        get: function(){
            return oldVal
        },
        set: function(newVal){
            oldVal = newVal
            cb && cb(newVal)
        }
    })
}

var common = {
    listenEvent: function(el, ev, fn, capture){
        if(window.addEventListener){
            el.addEventListener(ev, fn, capture)
        }else if(window.attachEvent){
            el.attachEvent('on' + ev, fn, capture)
        }else{
            el['on' + ev] = fn
        }
    },

    removeListenEvent: function(el, ev, fn, capture){
        if(window.removeEventListener){
            el.removeEventListener(ev, fn, capture)
        }else if(window.attachEvent){
            el.attachEvent('on' + ev, fn, capture)
        }
    },

    /**
     * [监听对象所有属性变化]
     * @param  {Object}   obj [要监听属性的对象]
     * @param  {Function} cb  [description]
     */
    observable: function(obj, prop, cb){
        var type = Object.prototype.toString.call(prop)
        var props = []
        if(type === '[object String]'){
            props = [prop]
        }else if(type === '[object Function]'){
            props = Object.keys(obj)
            cb = prop
        }else if(type === '[object Array]'){
            props = prop
        }

        for(var i = 0;i < props.length;i++){
            watch(obj, props[i], cb)
        }

    },
    post (path, para) {
        return new Promise((resolve, reject) => {
            request.post(path)
                .send(para || {})
                .end((err, res) => {
                    if(/^5/.test(res.status + ''))
                        resolve({err: err + ''})

                    var json = JSON.parse(res.text)

                    /*if(json.code != 200 && json.code != 201)
                        resolve({errMsg: json.msg})*/

                    resolve(json)
                })
        })
    }
}

export default common