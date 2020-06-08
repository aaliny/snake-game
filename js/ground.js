var ground=new Ground(sqWidth*sceneXNum,sqHeight*sceneYNum,BASE_X_POINT,BASE_Y_POINT,'#d400ff');
console.log(ground)
ground.init=function () {
    // let obj=Ground.create('Ground',this.width,this.height,this.x,this.y,"red");
    this.squareTable=[];
    this.viewportElement.style.backgroundColor=this.color;
    this.viewportElement.style.width=this.width+'px';
    this.viewportElement.style.height=this.height+'px';
    this.viewportElement.style.left=this.x+'px';
    this.viewportElement.style.top=this.y+'px';
    this.viewportElement.style.position="absolute";
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
ground.remove=function(x,y){
    document.body.removeChild( this.squareTable[x][y].viewportElement);
    this.squareTable[x][y]=null;
}
ground.add=function(obj){
    this.squareTable[obj.x][obj.y]=obj;
    document.body.appendChild( obj.viewportElement);
}