var count = 30;
var score = 0;
var timer;
var Radios = [];
var pos;
window.onload = function() {
    getRadios();
    BeginStopTime();
}

//getRadios by dom ways
function getRadios() {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 60; i++) {
        var element = document.createElement("input");
        element.name = "mole";
        element.className = "MOLE";
        element.type = "radio";
        element.checked = false;
        Radios.push(element);
        frag.appendChild(element);
    }
    document.getElementById("game").appendChild(frag);
}

//time processing
function timeCount() {
    if (count != -1) {

        //time setting
        var timeElement = document.getElementById("time");
        timeElement.value = count;
        count -= 1;
        timer = setTimeout("timeCount()", 1000);

        //show status
        document.getElementById("end").innerHTML = "Playing";
        Playing();
    } else {
        clear();
        show();
    }

}

//timer cleaning
function stopCount() {
    count = 30;
    setTimeout("document.getElementById('time').value = 0", 0);
    clearTimeout(timer);
}

//begin and end process
function BeginStopTime() {
    document.getElementById("start").addEventListener("click", function() {
        clearTimeout(timer);
        if (count != 30) {
            clear();
            show();
            score = 0;
            document.getElementById("score").value = "0";
        } else {
            statusSetting();
            score = 0;
            document.getElementById("score").value = "0";
            timeCount();
        }
    })
}

//get random numbers
function getRandomNumber() {
    return Math.floor(Math.random()*60);
}

//clear all the datas
function clear() {
    count = 0;
    stopCount();
    document.getElementById("end").innerHTML = "Game Over.";
    reSet();
}
function reSet() {
    for (var i = 0; i < 60; i++) {
        Radios[i].checked = false;
    }
}

//user playing
function Playing() {
    for (var j = 0; j < 60; j++) {
        Radios[j].onclick = function() {
            if (this.className == "MOLES") {
                score += 1;
                this.className = "MOLE";
                statusSetting();
                document.getElementById("score").value = score.toString();
            } else {
                --score;
                Radios[pos].checked = true;
                document.getElementById("score").value = score.toString();
            }
        }
    }
}
//show the result
function show() {
    alert("Game Over! \n Score:"+document.getElementById("score").value);
}

function statusSetting() {
    pos = getRandomNumber();
    Radios[pos].checked = true;
    Radios[pos].className = "MOLES";
}