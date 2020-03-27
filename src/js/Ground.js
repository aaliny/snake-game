/*
* @Author: Marte
* @Date:   2020-03-16 15:34:29
* @Last Modified by:   Marte
* @Last Modified time: 2020-03-16 19:52:49
*/

'use strict';
//初始化场景：

var ground = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);

ground.init = function () {
    //渲染广场：
    this.viewContnet.style.position = 'absolute';
    this.viewContnet.style.backgroundColor = '#0ff';
    this.viewContnet.style.left = this.x + 'px';
    this.viewContnet.style.top = this.y + 'px';
    this.viewContnet.style.width = this.width + 'px';
    this.viewContnet.style.height = this.height + 'px';
    document.body.appendChild(this.viewContnet);

    //存储管理广场中所有方块对象：
    this.SquareTable = [];
    for (var i = 0; i < YLEN; i++) {
        this.SquareTable[i] = new Array(XLEN); //让每一排的数组都有XLEN个；
        for(var j = 0; j < XLEN; j++) {
            if(j == 0 || i == 0 || j == XLEN - 1 || i == YLEN - 1){ //创建围墙;
                var newSquare = SquareFactory.create('Stone', j, i, '#000');

            }else{ //创建地板；
                var newSquare = SquareFactory.create('Floor', j, i, 'orange');
            }
            this.SquareTable[i][j] = newSquare; //方块存到二维数组中；
            this.viewContnet.appendChild(newSquare.viewContnet);
        }
    }
}

//拆方法：
ground.remove = function (x, y) {
    //根据坐标定位方块，真正找到方块：
    var square = this.SquareTable[y][x];
    //从视觉上抹去(html结构中抹去)：
    this.viewContnet.removeChild(square.viewContnet);
    //从数据上抹去方块：
    this.SquareTable[y][x] = null;
}

//安方法：
ground.append = function (square) {
    //从视觉上添加（html结构中添加）：
    this.viewContnet.appendChild(square.viewContnet);
    //从数据上添加方块：
    this.SquareTable[square.y][square.x] = square;
}

