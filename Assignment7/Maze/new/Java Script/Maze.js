window.onload = function() {
    (function() {
        var Maze = function() {
            this.initializeRecordingVariable();
            this.clear();
            this.mouseoverWall();
            this.startGame();
            this.endGameJudgement();
            this.mouseoverRoad();
        }
        var mazeProto = Maze.prototype;

        mazeProto.initializeRecordingVariable = function() {
            this.begin = false;
            this.fail = false;
            this.answer = false;
            this.Road = [false, false, false, false, false];
        }

        mazeProto.clear = function() {
            this.initializeRecordingVariable();
            $("#output").val("");
        }

        mazeProto.mouseoverWall = function() {
            var that = this;
            $(".wall").mouseover(function() {
                if (that.answer) return;
                if (that.begin) {
                    this.className = "hitWall";
                    that.showLose();
                }
            });
            this.recover();
        }

        mazeProto.showLose = function() {
            $("#output").val("You Lose");
            this.fail = true;
            this.answer = true;
        }

        mazeProto.recover = function() {
            $(".wall").mouseout(function() {
                this.className = "wall";
            });
        }

        mazeProto.startGame = function() {
            var that = this;
            $("#start").mouseover(function() {
                if (that.begin) that.clear();
                that.begin = true;
            });
        }

        mazeProto.endGameJudgement = function() {
            var that = this;
            $("#end").mouseover(function() {
                if (!that.begin) return;
                if (that.fail) return;
                if (!that.CheatedJudgement()) return;
                that.answer = true;
                $("#output").val("You win");
            });
        }

        mazeProto.CheatedJudgement = function() {
            for (var y = 0; y < 5; y++) {
                if (!this.Road[y]) {
                    $("#output").val("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
                    this.answer = true;
                    return false;
                }
            }
            return true;
        }

        mazeProto.mouseoverRoad = function() {
            var that = this;
            $(".road").mouseover(function() {
                var identity = $(this).attr('id');
                var number = Number(identity[1])-1;
                that.Road[number] = true;
            })
        }
        $(function() {
            new Maze();
        })
    })();
}