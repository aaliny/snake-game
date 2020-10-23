利用设计模式开发贪吃蛇游戏
项目效果：https://aaliny.github.io/snake-game/ 
1、定义一个base类包含 height、width、color、x、y、viewportElement等属性

```javascript
function Base(width,height,x,y,color){
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=y;
    this.color=color;
    this.viewportElement=document.createElement("div")
}
```

2、定义子类（地板、蛇头、蛇尾、围墙、食物）集成base类

```javascript
var Ground=jsUtil.extends(Base);
var Floor=jsUtil.extends(Base);
var Wall=jsUtil.extends(Base);
var Food=jsUtil.single(Base);//通过单例模式生成
var SnakeHead=jsUtil.single(Base);
var SnakeTail=jsUtil.extends(Base);
```

3、定义一个工厂类，工厂的原型上定义多个方法(通过生成子类的实例，修饰当前实例的viewportElement属性)用于生成不同的实例

```javascript
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
Square.prototype.Food=function (x, y, color) {
    var obj=new Food(sqWidth, sqHeight,x, y,color);
    obj.x=x;
    obj.y=y;
    Square.prototype.init(obj,STRATEGYENUM.eat)
    return obj;

}
```

4、初始化生成地板，每一块地板都是由一个个小方块拼接而成的，循环调用工厂里的对应的生成地板的方法生成dom元素append到界面上

```js
var ground=new Ground(sqWidth*sceneXNum,sqHeight*sceneYNum,BASE_X_POINT,BASE_Y_POINT,'#d400ff');
// console.log(ground)
ground.init=function () {
    .....
    this.squareTable=[];
    document.body.appendChild(this.viewportElement)
    for(let i=0;i<sceneXNum;i++){
        this.squareTable[i] = new Array(sceneXNum); //让每一排的数组都有XLEN个；
        for(let j=0;j<sceneYNum;j++){
            let item
            if(i===0||j===0||i===sceneXNum-1||j===sceneYNum-1){
                item=Square.create("Wall",i,j,"black")
            }else{
                item=Square.create("Floor",i,j,"orange")
            }
            this.squareTable[i][j]=item;
            document.body.appendChild(item.viewportElement)
        }
    }
};
```

5、生成一个蛇，初始化根据自己的类生成蛇身、蛇头，对应的调用工厂里的方法生成dom节点append到界面上

```js
snake.init=function () {
    this.snakeHead=Square.create("SnakeHead",3,1,"red")
    this.snTail1=Square.create("SnakeTail",2,1,"yellow")
    this.snTail2=Square.create("SnakeTail",1,1,"yellow");
    ......
    ground.remove(3,1)
    ground.remove(2,1)
    ground.remove(1,1)
    ground.add(this.snakeHead)
    ground.add(this.snTail1)
    ground.add(this.snTail2)
    this.direction='RIGHT';
};
```

6、开始游戏时，设置一个定时器去进行蛇的移动，通过蛇本身定义的方向，计算出下一次蛇头将要到达的位置，在判断下一个位置的触发事件（吃食物、碰到墙壁），从而进行蛇的动作，如果是继续移动，将蛇头当前的位置替换成蛇身，蛇头移动到下一个位置，蛇尾根据是否吃食物进行改变，如果吃了食物，蛇尾不变，没吃的话，蛇尾部分要变成地板

```javascript
snake.move=function(ground){
    var dir=DIRECTIONENUM[this.direction];
    var square=ground.squareTable[this.head.x+dir.x][this.head.y+dir.y];
    if(typeof square.touch==="function"){
        snakeStrategies[square.touch()](this,square,ground)
    }
}
```

7、当下一个移动位置是墙壁或者自己的话，则停止循环，结束游戏

```javascript
MOVE:function (snake,square,ground,fromEat) {
    //新建蛇身
    var snTail1=Square.create("SnakeTail",snake.head.x,snake.head.y,"yellow")
    ground.remove(snake.head.x,snake.head.y);
    ground.add(snTail1);
    ...
    //新建蛇头
    var snakeHead=Square.create("SnakeHead",square.x,square.y,"red");
    ground.remove(square.x,square.y);
    ground.add(snakeHead);
    ...
    if(!fromEat){//如果没有吃食物
        ground.remove(snake.tail.x,snake.tail.y);
        // return
        var floor=Square.create("Floor",snake.tail.x,snake.tail.y,"orange")
        ground.add(floor);
        snake.tail=snake.tail.last;
    }else{
    }

},
```


