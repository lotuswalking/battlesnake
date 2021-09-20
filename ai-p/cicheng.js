function positionToDirection(start,end) {
    let [x1,y1] = start;
    let [x2,y2] = end;
    // console.log([x2,y2]);
    let newDirection = "";
    if(x1===x2) 
    {
        newDirection = (y1>y2) ? "u": "d";
    }else if(y1===y2) {
        newDirection = (x1 > x2) ? "l": "r";
    }
    // console.log(newDirection);
    return newDirection;
}

function cicheng_newGame(){

}



function cicheng_getDirection(gridSize,snake,apples,direction){
    return "r";
}

ais['cicheng'] = {
    getDirection: cicheng_getDirection,
    newGame: cicheng_newGame
};