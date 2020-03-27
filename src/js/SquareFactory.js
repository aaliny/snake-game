
//工厂模式批量生产对象：

function SquareFactory () {

}

SquareFactory.create  = function (type, x, y, color) {
    if (typeof SquareFactory.prototype[type] == undefined){
        throw 'no this type';
    }
    if (SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    var newSquare = new SquareFactory.prototype[type](x, y, color);
    return newSquare;
}

SquareFactory.prototype.init = function (square, color, message) {
    // console.log(square, color);
    square.viewContnet.style.position = 'absolute';
    square.viewContnet.style.width = square.width + 'px';
    square.viewContnet.style.height = square.height + 'px';
    square.viewContnet.style.left = square.x * SQUAREWIDTH + 'px';
    square.viewContnet.style.top = square.y * SQUAREWIDTH + 'px';
    square.viewContnet.style.backgroundColor = color;
    square.touch = function () {
        return message;
    }
}

SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(floor, color, STRATEGYENUM.move);
    return floor;
}

SquareFactory.prototype.Stone = function (x, y, color) {
    var stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(stone, color, STRATEGYENUM.die);
    return stone;
}

SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food (x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(food, color, STRATEGYENUM.eat);
    food.update(x, y);
    return food;
}

SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var sh = new SnakeHead(x, y,SQUAREWIDTH, SQUAREWIDTH);
    this.init(sh, color, STRATEGYENUM.die);
    sh.update(x, y);
    return sh;
}

SquareFactory.prototype.SnakeBody = function (x, y, color) {
   var sb = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
   this.init(sb, color, STRATEGYENUM.die);
   return sb;
}

// SquareFactory.create('Floor', 1, 2, 'origin');
