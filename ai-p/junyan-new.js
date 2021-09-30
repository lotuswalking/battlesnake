import pathSolution from "./pathSolution.js";
let myPathSolution;
function Object_getDirection(gridSize,snake,apples,direction){
    myPathSolution.xLog("开始寻路",myPathSolution);
    myPathSolution.init(gridSize,snake,apples)
    if(myPathSolution.needFindPath) {
        // myPathSolution.xLog("开始寻路");
        myPathSolution.findStepsToApple(snake,apples);
    }
    // myPathSolution.xLog("Runing Path is:",myPathSolution.path);
    if(myPathSolution.path.length === 1 )   {
        xLog("路径即将跑完,当前剩余路线为:",path);
        myPathSolution.needFindPath = true;
    }
    if(myPathSolution.path.length) {
        let [x,y] = myPathSolution.path.pop();
        let start = myPathSolution.getLocByIndex(snake[0]);
        let newDirection = myPathSolution.positionToDirection(start,[x,y]);
        myPathSolution.xLog(start,"==>",x,y,newDirection);
        if(newDirection!="") return newDirection;
    }


    return direction;
}

function Object_newGame(){
    myPathSolution= new pathSolution();
    return;
}

ais['junyan-new'] = {
    getDirection: Object_getDirection,
    newGame: Object_newGame
};