var count = 30;
var timer;
var Radios = [];
var score = 0;

window.onload = function() {
    getRadios();
    BeginStopTime();
}

function getRadios() {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 60; i++) {
        var element = document.createElement("div");
        element.className = "buttonStyle";
        Radios.push(element);
        frag.appendChild(element);
    }
    document.getElementById("game").appendChild(frag);
}
//timer
function timeCount() {
    if (count != -1) {
        var timeElement = document.getElementById("time");
        timeElement.value = count;
        count -= 1;
        timer = setTimeout("timeCount()", 1000);
        document.getElementById("end").innerHTML = "Playing";
        Playing();
    } else {
        clear();
        show();
        stopMusic();
    }
}
//reset the clock
function stopCount() {
    count = 30;
    setTimeout("document.getElementById('time').value = 0", 0);
    clearTimeout(timer);
}

function getRandomNumber() {
    return Math.floor(Math.random()*60);
}

function clear() {
    count = 0;
    stopCount();
    document.getElementById("end").innerHTML = "Game Over.";
    reSet();
}
function reSet() {
    for (var i = 0; i < 60; i++) {
        Radios[i].className = "buttonStyle";
    }
}
//begin and end proceesing
function BeginStopTime() {
    document.getElementById("start").addEventListener("click", function() {
        clearTimeout(timer);
        var audio = document.getElementById("bgMusic");
        if (count != 30) {
            stopMusic();
            clear();
            show();
            score = 0;
            document.getElementById("score").value = "0";
        } else {
            statusSetting();
            score = 0;
            document.getElementById("score").value = "0";
            timeCount();
            audio.play();
        }
    })
}

function Playing() {
    for (var j = 0; j < 60; j++) {
        Radios[j].onclick = function() {
            if (this.className == "change") {
                score += 1;
                document.getElementById("score").value = score.toString();
                this.className = "buttonStyle";
                statusSetting();
            } else {
                --score;
                document.getElementById("score").value = score.toString();
            }
        }
    }
}

//stop broadcasting music
function stopMusic() {
    var audio = document.getElementById("bgMusic");
    audio.pause();
    audio.currentTime = 0;
}
//show the result
function show() {
    alert("Game Over! \n Score:"+document.getElementById("score").value);
}
/*
function CloseBGM() {
    document.getElementById("CloseBGM").onclick = function() {
        stopMusic();
    }
}
*/

function statusSetting() {
    var pos = getRandomNumber();
    Radios[pos].className = "change";
}