var jsUtil={
    //单例模式
    single:function (origin) {
        var singleFunc=(function () {
            var instance=null;
            return function () {
                if(instance===null){
                    instance=this;
                    origin&&origin.apply(instance,arguments)
                }
                return instance;
            }
        })();
        origin&&this.inherit(origin,singleFunc);
        return singleFunc;
    },
    inherit:function (origin,target) {
        function F(){}
        F.prototype=origin.prototype;
        target.prototype=new F();
        target.prototype.constructor=target;
    },
    extends:function (origin) {
        var result=function () {
            origin.apply(this,arguments)
        };
        this.inherit(origin,result)
        return result;
    }
}
Parent.prototype.touch=function () {
    console.log("222")
}
function Parent(){

}
function Son(){

}
let a=jsUtil.inherit(Parent,Son);
let b=new Son();
