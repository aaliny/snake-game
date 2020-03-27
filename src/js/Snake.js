/*
* @Author: Marte
* @Date:   2020-03-16 17:46:04
* @Last Modified by:   Marte
* @Last Modified time: 2020-03-16 23:18:08
*/

'use strict';

var snake = new Snake();
var head = null;
var tail = null;

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

//初始化蛇：
snake.init = function () {
    //创建蛇头、蛇身：
    var SnakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
    var SnakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'blue');
    var SnakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'blue');
    //链表储存方式：让蛇头蛇身相关联：
    SnakeHead.next = SnakeBody1;
    SnakeHead.last = null;
    SnakeBody1.next = SnakeBody2;
    SnakeBody1.last = SnakeHead;
    SnakeBody2.next = null;
    SnakeBody2.last = SnakeBody1;

    //记录：
    this.head = SnakeHead;
    this.tail = SnakeBody2;

    //渲染：
    ground.remove(SnakeHead.x, SnakeHead.y);
    ground.append(SnakeHead);
    ground.remove(SnakeBody1.x, SnakeBody1.y);
    ground.append(SnakeBody1);
    ground.remove(SnakeBody2.x, SnakeBody2.y);
    ground.append(SnakeBody2);

    //默认方向：
    snake.direction = DIRECTIONENUM.RIGHT;
}

//引入策略处理：
snake.strategies = {
    MOVE: function (snake, square, ground, fromEat) {   //实现运动：
        //新建蛇身：
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'blue');
        newBody.next = snake.head.next;
        newBody.next.last = newBody;
        newBody.last = null;

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);
        //新建蛇头：
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'red');
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;
        ground.remove(newHead.x, newHead.y);
        ground.append(newHead);
        snake.head = newHead;
        //删除蛇尾：
        if (!fromEat) {
            var floor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(floor);
            snake.tail = snake.tail.last;
        }
    },
    EAT: function (snake, square, ground) {
        this.MOVE(snake, square, ground, true);
        game.score++;
        oSpan.innerText = game.score;
        createFood(ground);
    },
    DIE: function () {
        if (game.maxScore >= game.score) {
            game.over(false);
        }else{
            game.maxScore = game.score;
            game.over(true);
        }
    }
}

//做下一步运动预判：
snake.move = function (ground) {
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];

    if (typeof square.touch == 'function') {
        this.strategies[ square.touch() ](this, square, ground);
    }
}
