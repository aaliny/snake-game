/*
* @Author: Marte
* @Date:   2020-03-16 19:49:40
* @Last Modified by:   Marte
* @Last Modified time: 2020-03-17 02:41:16
*/

'use strict';

var game = new Game
    game.timer = null;
    game.iSpeedInterval = 100;
    manageCookie.getCookie('maxScore', function (maxScore) {
        if (!maxScore) {
            oMSpan.innerText = 0;
        }else{
            game.maxScore = maxScore;
            oMSpan.innerText = game.maxScore;
        }
    });

game.init = function () {


    ground.init();
    snake.init(ground);
    //绑定事件监控
    function play (e) {
        if (e.which == 37 && snake.direction != DIRECTIONENUM.RIGHT) {
            snake.direction = DIRECTIONENUM.LEFT;
        }else if (e.which == 38 && snake.direction != DIRECTIONENUM.DOWN) {
            snake.direction = DIRECTIONENUM.TOP;
        }else if (e.which == 39 && snake.direction != DIRECTIONENUM.LEFT) {
            snake.direction = DIRECTIONENUM.RIGHT;
        }else if (e.which == 40 && snake.direction != DIRECTIONENUM.TOP) {
            snake.direction = DIRECTIONENUM.DOWN;
        }
    }
    document.onkeydown = tool.throttle(play, 100);
}


game.start = function () {
    clearInterval(game.timer);
    game.timer = setInterval(function () {
        snake.move(ground);
    }, game.iSpeedInterval)
}

game.over = function (fromDie) {
    clearInterval(game.timer);
    if (fromDie) {
        manageCookie.setCookie('maxScore', game.maxScore, 20000);
        oMSpan.innerText = game.maxScore;
        alert('new points!!')
    } else{
        alert('game over!');
    }
}
game.init()


//创建食物：
function createFood (ground) {
    var x = null;
    var y = null;
    var flag = true;
    while (flag) {
        x = 1 + parseInt(Math.random() * 28);
        y = 1 + parseInt(Math.random() * 28);
        var ok = true;
        for (var node = snake.head; node; node = snake.next) {
            if (x == node.x && y == node.y) {
                ok = false;
                break;
            }
        }
        if (ok) {
            flag = false;
        }
    }
    var food = SquareFactory.create('Food', x, y, 'green');
    ground.remove(food.x, food.y);
    ground.append(food);
}


play.onclick = function (){

    game.score = 0;

    oSpan.innerText = game.score;

    ground.init()
    snake.init()
    createFood(ground);
    game.start()
}