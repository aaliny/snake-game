/*
* @Author: Marte
* @Date:   2020-02-24 16:14:19
* @Last Modified by:   Marte
* @Last Modified time: 2020-03-16 23:29:41
*/

'use strict';
//定义一些经常用到的变量
//场景 == 广场 宽度系数、高度系数：
var XLEN = 30;
var YLEN = 30;

//每个方块宽高：
var SQUAREWIDTH = 20;

//广场位置：
var BASE_X_POINT = 200;
var BASE_Y_POINT = 20;

//定义基类：
function Square (x, y, width, height, viewContnet) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContnet = viewContnet || document.createElement('div');
}
Square.prototype.touch = function () {

}
Square.prototype.update = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContnet.style.left = x * SQUAREWIDTH + 'px';
    this.viewContnet.style.top = y * SQUAREWIDTH + 'px';
}

//定义子类：
var Floor = tool.extends(Square); //地板

var Stone = tool.extends(Square); //围墙（障碍物）

var Food = tool.single(Square);   //食物

var Snake = tool.single(); //蛇

var SnakeHead = tool.single(Square); //蛇头

var SnakeBody = tool.extends(Square); //蛇身；

var Ground = tool.single(Square);  //场景

var Game = tool.single();

//集合所有策略消息：
var STRATEGYENUM = {
    move: 'MOVE',
    eat: 'EAT',
    die: 'DIE'
}
