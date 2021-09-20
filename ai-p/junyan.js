let needFindPath = true;
let path = [];
let cruise = false;
let actionPath = [];
function Junyan_getDirection(gridSize,snake,apples,direction){
    //开始寻路
    // console.log("Junyan_getDirection");
    
    let start = getLocByIndex(snake[0],gridSize);
    let queue = [start];
    let map = new Array(gridSize * gridSize).fill(0);
    let ends = apples.slice();
    let cruiseAccount = gridSize +5;
    snake.forEach((e) => {
        map[e] = 1;
    });
    let storeTable = [];
    if(snake.length > cruiseAccount) {
        let [x,y] = getLocByIndex(snake[0],gridSize);
        xLog("进入巡航模式,蛇头位置:",x,y,snake[0]);
        ends = [0];
        if(snake[0] === 0) {
           
            xLog("巡航模式开始",snake[0]);
            cruise = true;
            needFindPath = false
            
            
        }
       

    }
    if(cruise) {
            
            let cruisePath = [];
            cruisePath = buildCrusePath(gridSize);
            if(actionPath.length === 0) actionPath = cruisePath.slice();
            let newWay = actionPath.shift();
            xLog("巡航中",snake[0],newWay);
            return newWay;
    }
    if(needFindPath) {       

        xLog("Queue before Loop:",queue[0],map);
        while(queue.length) {              
            let [x, y] = queue.shift();
            // xLog(x,y);
            for(let i=0;i<ends.length;i++) {                
                let end = getLocByIndex(ends[i],gridSize);
                // xLog("End:",apples[i], end);
                if(start[0] === end[0] && start[1] === end[1]) break;
                if(x === end[0] && y ===end[1]) {
                    xLog("找到了路径到:",end);
                    while(x != start[0] || y != start[1]) {
                        path.push([x,y]);
                        [x,y] = storeTable[y * gridSize + x];
                    }
                    needFindPath = false;
                    xLog("Path in loop:",path.length,path);
                    break;
                }
                
            }
            if(!needFindPath) break;
            // console.log(x, y);
            insertInto(queue,map,storeTable,[x-1,y],[x,y],gridSize);
            insertInto(queue,map,storeTable,[x+1,y],[x,y],gridSize);
            insertInto(queue,map,storeTable,[x,y-1],[x,y],gridSize);
            insertInto(queue,map,storeTable,[x,y+1],[x,y],gridSize);
        }
        if(needFindPath) {
            let [x, y] = getLocByIndex(snake[0],gridSize);
            xLog("锁死了,进入随机寻路模式,寻找可能出口",x,y); 
            return tryAnyPath(x,y,gridSize,map)
            
        }
    }
    if(path.length === 1 && snake.length <= cruiseAccount)   {
        xLog("路径即将跑完,当前剩余路线为::",path);
        needFindPath = true;
    }
    // xLog("Path In process:",path);
    if(path.length) {
        let [x,y] = path.pop();    
        let newDirection = positionToDirection(start,[x,y]);
        xLog(start,"==>",x,y,newDirection);
        if(newDirection!="") return newDirection;
    }
 
        
    // return "r";
};
function tryAnyPath(x,y,gridSize,map){
    if(getBestPath(x,y-1,gridSize,map)) return "u";
    if(getBestPath(x,y+1,gridSize,map)) return "d";
    if(getBestPath(x+1,y,gridSize,map)) return "r";
    if(getBestPath(x-1,y,gridSize,map)) return "l"; 
    
    if(getAnyPath(x,y-1,gridSize,map)) return "u";
    if(getAnyPath(x,y+1,gridSize,map)) return "d";
    if(getAnyPath(x+1,y,gridSize,map)) return "r";
    if(getAnyPath(x-1,y,gridSize,map)) return "l"; 
    return "l"
}
function getBestPath(x,y,gridSize,map) {
        if (x < 1 || x >= gridSize-1 || y < 1 || y >= gridSize-1) return false;
        if (map[y * gridSize + x]) return false;
        return true;

}   
function getAnyPath(x,y,gridSize,map) {
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
        // console.log("x,y:",x,y);
        return false;
    }
    if (map[y * gridSize + x]) {
        // console.log("table[y * gridSize + x]",table[y * gridSize + x]);;
        return false;
    }
    return true;
}

function insertInto(queue,map,storeTable,curLoc,preLoc,gridSize) {
    let [x,y] = curLoc;
    // xLog("位置:",x,y,"内容:",map[y * gridSize + x]);
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return;
    if (storeTable[y * gridSize + x]) return;
    if (map[y * gridSize + x]) return;
    storeTable[y * gridSize + x] = preLoc;
     // 把可走的路推入队列    
    queue.push([x, y]);

}
function xLog(...text) {
    // console.log(...text);
}

function Junyan_newGame(){
 needFindPath = true;
 path = [];
 cruise = false;
 actionPath = [];
    xLog("Junyan_newGame");
    return;
}

ais['junyan'] = {
    getDirection: Junyan_getDirection,
    newGame: Junyan_newGame
}

function getLocByIndex(index,gridSize) {
    return [index % gridSize,Math.floor(index / gridSize)];
}

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
function buildCrusePath(gridSize) {
    let path = [];
    path.push("r")
    for(let row=0;row<Math.floor(gridSize/2)-1;row++) {
        for(let i=1;i<gridSize-1;i++)  path.push("r");
        path.push("d");
        for(let i=1;i<gridSize-1;i++)  path.push("l");
        path.push("d");
    }
    if(gridSize % 2 ===1) {
        for(let i=1;i<gridSize-1;i++)  path.push("r");
        path.push("d");
        for(let col=0;col<Math.floor(gridSize/2)-1;col++) {
            path.push("d","l","u","l");

        }
        let flag = Math.floor(Math.random() * 2);
        if(flag ===0) {
            path.push("l","d","l","u");
        }else {
            path.push("d","l","u","l");
        }
        for(let i=1;i<gridSize-1;i++)  path.push("u");
    }else {
        for(let i=1;i<gridSize-1;i++)  path.push("r");   path.push("d");
        for(let i=1;i<gridSize;i++)  path.push("l");     path.push("u");
        for(let i=1;i<gridSize-1;i++)  path.push("u");
        
    }
   return path;
} 

