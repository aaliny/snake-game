/*
* @Author: Marte
* @Date:   2020-02-24 15:06:27
* @Last Modified by:   Marte
* @Last Modified time: 2020-03-16 22:38:18
*/

'use strict';

//方法库：
var tool = {
    //原型上的继承：圣杯模式；
    inherit: function (target, origin) {
        var temp = function () {}
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
    },
    //混合继承：继承原型加私有属性上的方法：
    extends: function (origin) {
        var result = function () {
            //this
            origin.apply(this, arguments);
        }
        this.inherit(result, origin);
        return result;
    },
    //传参时，返回函数时单例并且混合方式继承；不传参时，返回单例函数：
    single: function (origin){
        var singleResult = (function () {
            var instance;
            return function () {
                if (typeof instance == 'object'){
                    return instance;
                }
                instance = this;
                origin && origin.apply(this, arguments);
                return instance;
            }
        })();
        origin && this.inherit(singleResult, origin);
        return singleResult;
    },
    //节流：
    throttle: function (handle, wait) {
        var lastTime = 0;
        return function (e) {
            var nowTime = new Date().getTime();
            if (nowTime - lastTime > wait) {
                handle.apply(this, arguments);
                lastTime = nowTime;
            }
        }
    },
}
//cookie:
var manageCookie = {
    setCookie : function (name, value, time) {         //创建(更改)cookie;
        document.cookie = name + '=' + value +';max-age=' + time;
        return this;  //实现链式调用；
    },
    removeCookie : function (name) {                   //删除cookie;
        return this.setCookie(name, '', -1);
    },
    getCookie : function (name, callback) {            //获取cookie;
        var allCookieArr = document.cookie.split('; ');
        for(var i = 0; i < allCookieArr.length; i++) {
            var itemCookieArr = allCookieArr[i].split('=');
            if(itemCookieArr[0] == name) {
                callback(itemCookieArr[1]);
                return this;
            }
        }
        callback(null); //没有找到该cookie返回undefined;
        return this;
    }
}


