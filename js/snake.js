var snake=new Snake();
snake.init=function () {
    this.snakeHead=Square.create("SnakeHead",3,1,"red")
    this.snTail1=Square.create("SnakeTail",2,1,"yellow")
    this.snTail2=Square.create("SnakeTail",1,1,"yellow");
    this.head=this.snakeHead;
    this.tail=this.snTail2;
    this.head.last=null;
    this.head.next=this.snTail1;
    this.snTail1.last=this.head;
    this.snTail1.next=this.tail;
    this.tail.last=this.snTail1;
    this.tail.next=null;
    ground.remove(3,1)
    ground.remove(2,1)
    ground.remove(1,1)
    ground.add(this.snakeHead)
    ground.add(this.snTail1)
    ground.add(this.snTail2)
    this.direction='RIGHT';
};
//方向的枚举：
var DIRECTIONENUM = {
    LEFT:{
        x: -1,
        y: 0
    },
    RIGHT:{
        x: 1,
        y: 0
    },
    TOP:{
        x: 0,
        y: -1
    },
    DOWN:{
        x: 0,
        y: 1
    }
}
var snakeStrategies={
    MOVE:function (snake,square,ground,fromEat) {
        //新建蛇身
        var snTail1=Square.create("SnakeTail",snake.head.x,snake.head.y,"yellow")
        ground.remove(snake.head.x,snake.head.y);
        ground.add(snTail1);
        snTail1.next=snake.head.next;
        snTail1.next.last=snTail1;
        snTail1.last=snake.head;
        //新建蛇头
        var snakeHead=Square.create("SnakeHead",square.x,square.y,"red");
        ground.remove(square.x,square.y);
        ground.add(snakeHead);
        snakeHead.next=snTail1;
        snakeHead.last=null;
        snTail1.last=snakeHead;
        snake.head=snakeHead;
        if(!fromEat){
            ground.remove(snake.tail.x,snake.tail.y);
            // return
            var floor=Square.create("Floor",snake.tail.x,snake.tail.y,"orange")
            ground.add(floor);
            snake.tail=snake.tail.last;
        }else{
            debugger
        }

    },
    EAT:function (snake,square,ground) {
        this.MOVE(snake,square,ground,true)
        createFood();
        game.score++
        score.innerText=game.score;
        },
    DIE:function (snake,square,ground) {
        game.over();
    }
}
snake.move=function(ground){
    var dir=DIRECTIONENUM[this.direction];
    var square=ground.squareTable[this.head.x+dir.x][this.head.y+dir.y];
    if(typeof square.touch==="function"){
        snakeStrategies[square.touch()](this,square,ground)
    }
}
// setTimeout(function () {
//     clearInterval(timer)
// },2000)
