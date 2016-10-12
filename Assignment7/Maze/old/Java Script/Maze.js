var begin = false;
var fail = false;
var answer = false;
var Road = [false, false, false, false, false]
window.onload = function() {
    clear();
    hitWall();
    hitRoad();
    beginGame();
    endJudge();
}

function clear() {
    for (var i = 0; i < 5; i++) {
        Road[i] = false;
    }
    begin = false;
    fail = false;
    answer = false;
    document.getElementById("output").value = "";
}
function hitWall() {
    var wall = document.getElementsByClassName("wall");
    for (var j = 0, k = wall.length; j < k; j++) {
        wall[j].addEventListener("mouseover", function() {
            if (answer) return;
            if (begin) {
                this.className = "hitWall";
                document.getElementById("output").value = "You Lose";
                fail = true;
                answer = true;
            }
        }) ;
        wall[j].addEventListener("mouseout", function() {
            this.className = "wall";
        })
    }
}

function beginGame() {
    document.getElementById("start").addEventListener("mouseover", function() {
        if (begin) clear();
        begin = true;
    })
}

function endJudge() {
    document.getElementById("end").addEventListener("mouseover", function() {
        if (!begin) return;
        if (fail) return;
        for (var y = 0; y < 5; y++) {
            if (!Road[y]) {
                document.getElementById("output").value = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
                answer = true;
                return;
            }
        }
        answer = true;
        document.getElementById("output").value = "You win";
    })
}

function hitRoad() {
    document.getElementById("R1").addEventListener("mouseover", function(){
        Road[0] = true;
        })
    document.getElementById("R2").addEventListener("mouseover", function(){
        Road[1] = true;
    })
    document.getElementById("R3").addEventListener("mouseover", function(){
        Road[2] = true;
    })
    document.getElementById("R4").addEventListener("mouseover", function(){
        Road[3] = true;
    })
    document.getElementById("R5").addEventListener("mouseover", function(){
        Road[4] = true;
    })
}
