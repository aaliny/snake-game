
//每个方块宽高：
var sqWidth=10;
var sqHeight=10;
var sceneXNum=30;
var sceneYNum=40;
//广场位置：
var BASE_X_POINT = 200;
var BASE_Y_POINT = 20;
function Base(width,height,x,y,color){
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=y;
    this.color=color;
    this.viewportElement=document.createElement("div")
}
var Ground=jsUtil.extends(Base);
var Floor=jsUtil.extends(Base);
var Wall=jsUtil.extends(Base);
var Food=jsUtil.single(Base);
var SnakeHead=jsUtil.single(Base);
var SnakeTail=jsUtil.extends(Base);
var Snake = jsUtil.single(); //蛇
var obj=new Floor(30,10,3,3);
var obj1=new Floor(22,10,2,2);
//集合所有策略消息：
var STRATEGYENUM = {
    move: 'MOVE',
    eat: 'EAT',
    die: 'DIE'
}
