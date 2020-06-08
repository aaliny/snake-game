function Game(){};
var game=new Game();
game.init=function(){
    document.onkeydown=function(e){
        if (e.which == 37 && snake.direction != 'RIGHT') {
            snake.direction ='LEFT';
        }else if (e.which == 38 && snake.direction !="DOWN") {
            snake.direction = "TOP";
        }else if (e.which == 39 && snake.direction != "LEFT") {
            snake.direction = "RIGHT";
        }else if (e.which == 40 && snake.direction != "TOP") {
            snake.direction = "DOWN";
        }
    }


}
game.over = function () {
    clearInterval(game.timer);
    alert('game over!');
}
function createFood() {
    var x = null;
    var y = null;
    var flag = true;
    while (flag) {
        x =Math.floor(Math.random()*28+1);
        y = Math.floor(Math.random()*28+1);
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
    var food=Square.create("Food",x,y,'green');
    ground.remove(food.x, food.y);
    ground.add(food);
}
ground.init();
snake.init();
game.score=0;
score.innerText=game.score;
play.onclick=function () {
    score.innerText=game.score;
    ground.init();
    snake.init();
    game.score=0;
    game.init();
    createFood();
    game.start()
}
game.start = function () {
    game.score=0;
    score.innerText=game.score;
    clearInterval(game.timer);
    game.timer = setInterval(function () {
        snake.move(ground);
    }, 400)
}
