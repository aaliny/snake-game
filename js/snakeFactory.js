function Square(sqWidth,sqHeight) {

}
Square.create=function () {
    var type=arguments[0];
    var arg=[].slice.call(arguments,1);
    if(Square.prototype[type]._proto_!==Square.prototype){
        Square.prototype[type].prototype=new Square();
    }
    return new Square.prototype[type](...arg)
};
Square.prototype.init=function(obj,msg){
    obj.viewportElement.style.backgroundColor=obj.color;
    obj.viewportElement.style.width=obj.width+'px';
    obj.viewportElement.style.height=obj.height+'px';
    obj.viewportElement.style.left=obj.x*sqWidth+BASE_X_POINT+'px';
    obj.viewportElement.style.top=obj.y*sqHeight+BASE_Y_POINT+'px';
    obj.viewportElement.style.position="absolute";
    obj.touch=function () {
        return msg;
    }
}
Square.prototype.Floor=function (x, y, color) {
    var obj=new Floor(sqWidth, sqHeight,x, y,color);
    Square.prototype.init(obj,STRATEGYENUM.move);
    return obj;

}
Square.prototype.Wall=function (x, y, color) {
    var obj=new Wall(sqWidth, sqHeight,x, y,color);
    Square.prototype.init(obj,STRATEGYENUM.die)
    return obj;

}
Square.prototype.Food=function (x, y, color) {
    var obj=new Food(sqWidth, sqHeight,x, y,color);
    obj.x=x;
    obj.y=y;
    Square.prototype.init(obj,STRATEGYENUM.eat)
    return obj;

}
Square.prototype.SnakeHead=function (x, y, color) {
    var obj=new SnakeHead(sqWidth, sqHeight,x, y,color);
    obj.x=x;
    obj.y=y;
    Square.prototype.init(obj,STRATEGYENUM.die)
    return obj;

}
Square.prototype.SnakeTail=function (x, y, color) {
    var obj=new SnakeTail(sqWidth, sqHeight,x, y,color);
    Square.prototype.init(obj,STRATEGYENUM.die)
    return obj;

}

