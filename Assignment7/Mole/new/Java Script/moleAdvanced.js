var p = new Object;
p.count= 30;
p.score = 0;
p.Radios = [];
window.onload = function() {

		var Mole = function() {
			this.setInicializableVariable();
			this.getRadios();
			this.BeginOrStopGame();
			this.closeMusic();
			this.openMusic();
		}

		var MoleProto = Mole.prototype;

		MoleProto.getRadios = function() {
			var frag = document.createDocumentFragment();
		    for (var i = 0; i < 60; i++) {
		        var element = document.createElement("div");
		        element.className = "buttonStyle";
		        p.Radios.push(element);
		        frag.appendChild(element);
		    }
		    document.getElementById("game").appendChild(frag);
		}

		MoleProto.setInicializableVariable = function() {
			this.audio = document.getElementById("bgMusic");
		}

		MoleProto.BeginOrStopGame = function() {
			var that = this;
			$("#start").click(function() {
		        clearTimeout(p.timer);
		        if (p.count != 30) {
		            that.stopGame();
		        } else {
		            that.startGame();
		        }
		    })
		}

		MoleProto.stopGame = function() {
			this.AfterStop();
            p.score = 0;
            $("#score").val("0");
		}

		MoleProto.startGame = function() {
			statusSetting(); 
            p.score = 0;
            $("#score").val("0");
            timecount();
            this.musicPlay();

		}

		MoleProto.stopMusic = function() {
			this.audio.pause();
            this.audio.currentTime = 0;
		}

		MoleProto.musicPlay = function() {
			this.audio.play();
		}

		MoleProto.AfterStop = function() {
			clear();
	        show();
	        this.stopMusic();
		}

		MoleProto.closeMusic = function() {
			var that = this;
			$("#CloseBGM").click(function() {
				that.stopMusic();
			})
		}
		
		MoleProto.openMusic = function() {
			var that = this;
			$("#OpenBGM").click(function() {
				that.musicPlay();
			})
		}
		$(function() {
			new Mole();
		})
}

var timecount = function() {
	if (p.count != -1) {
        $("#time").val(p.count);
        p.count -= 1;
        p.timer = setTimeout("timecount()", 1000);
        $("#end").html("Playing");
        PlayingTheGame();
    } else {
        clear();
        show();
        document.getElementById("bgMusic").pause();
    }
}

var PlayingTheGame = function() {
    for (var j = 0; j < 60; j++) {
        p.Radios[j].onclick = function() {
            if (this.className == "change") {
                this.className = "buttonStyle";
                WhenHittedMole();
            } else {
                --p.score;
                $("#score").val(p.score.toString());
            }
        }
    }
}


var clear = function() {
	p.count = 0;
    stopcount();
    $("#end").html("Game Over.");
    reSetMoles();
}

var reSetMoles = function() {
	for (var i = 0; i < 60; i++) {
        p.Radios[i].className = "buttonStyle";
    }
}

var stopcount = function() {
	p.count = 30;
    setTimeout("$('#time').val(0)", 0);
    clearTimeout(p.timer);
}

var statusSetting = function() {
	var pos = getRandomNumber();
	p.Radios[pos].className = "change";
}

var getRandomNumber = function() {
	return Math.floor(Math.random()*60);
}

var WhenHittedMole = function() {
	p.score += 1;
    $("#score").val(p.score.toString());
    statusSetting();
}

var show = function() {
	alert("Game Over! \n score:"+$("#score").val());
}