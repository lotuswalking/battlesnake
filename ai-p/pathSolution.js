export default class pathSolution{
    constructor(gridSize,snake,apples) {
        this.gridSize = gridSize;
        this.snake = snake;
        this.apples = apples;   
        this.path = [];  
        this.needFindPath = true;   
    }
    init(gridSize,snake,apples) {
        this.gridSize = gridSize;
        this.snake = snake;
        this.apples = apples;   
    }
    //查找前进路径
    findStepsToApple(snake,apples) {
        // this.xLog(this.snake[0]);
        let start = this.getLocByIndex(snake[0]);
        let map = this.initMap(this.gridSize, snake);
        let storeTable = [];
        let queue = [start];
        let ends = this.apples.slice();
        let pathFounded = false;
        // this.xLog("My Current Loc is:",start) ;  
        
        while(queue.length) {
            let [x,y] = queue.shift();      
            // this.xLog("Current Loc is:",[x,y]) ;     
            for(let i=0; i < ends.length; i++) {
                let end = this.getLocByIndex(ends[i]);
                if(start[0] === end[0] && start[1] === end[0]) break;
                if(x === end[0] && y === end[1]) {//成功找到路径

                    this.xLog("找到路径From",start," ==> ",end) ;
                    this.path = [];
                    while(x != start[0] || y != start[1]) {
                        this.path.push([x,y]);
                        [x,y] = storeTable[y * gridSize + x];
                    }
                    // let newTempSnake = snake.concat(this.path)
                    // let newSnake = newTempSnake.slice(-(newTempSnake.length - snake.length));
                    // let newApples = apples.slice(1);
                    // if(!this.findStepsToApple(newSnake,newApples)) {
                    //     console.log("找到的路径应该是死胡同",newSnake," ==> ",newApples);
                    //     break;
                    // }
                    pathFounded = true;
                    this.needFindPath = false;
                    this.xLog("找到路径From",start," ==> ",end,"路径内容为:",this.path) ;  
                    return true;                    
                }
            }
            this.checkNextStep(queue,map,storeTable,[x-1,y],[x,y],this.gridSize);
            this.checkNextStep(queue,map,storeTable,[x+1,y],[x,y],this.gridSize);
            this.checkNextStep(queue,map,storeTable,[x,y-1],[x,y],this.gridSize);
            this.checkNextStep(queue,map,storeTable,[x,y+1],[x,y],this.gridSize);
        }
        if(!pathFounded) {
            return false;
            // return tryAnyPath(x,y,gridSize,map)
        }
        

    }
    //初始化地图数据
    initMap(gridSize,snake) {
        let map = new Array(gridSize * gridSize).fill(0);
        snake.forEach((e) => {
            map[e] = 1;
        });
        return map;

    }
    xLog(...text) {
        // console.log(...text);
    }
    //检查下一位置是否可以通行
    checkNextStep(queue,map,storeTable,curLoc,preLoc,gridSize) {
    let [x,y] = curLoc;
    // xLog("位置:",x,y,"内容:",map[y * gridSize + x]);
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return;
    if (storeTable[y * gridSize + x]) return;
    if (map[y * gridSize + x]) return;
    storeTable[y * gridSize + x] = preLoc;
     // 把可走的路推入队列    
    queue.push([x, y]);
    }
    //将位置索引转换位坐标信息
    getLocByIndex(index) {
        let gridSize = this.gridSize;
        return [index % gridSize,Math.floor(index / gridSize)];
    }
    //将坐标差异转换为上下左右,只能处理相邻坐标
    positionToDirection(start,end) {
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

}