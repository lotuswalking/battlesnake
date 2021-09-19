let ais = {};

function moreUpdate(){
    if (direction == ""){
        direction = "r"
    }
    if (!gameOver){
<<<<<<< Updated upstream
        direction = ais['cicheng'](gridSize,snake,apples,direction);
=======
        if (ai == ""){
            ai = 'junyan';
        }
        d = ais[ai](gridSize,snake,apples,direction);
        if (["r","l","u","d"].includes(d)){
            direction = d;
        }
>>>>>>> Stashed changes
    }
}