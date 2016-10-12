window.onload = function() {
	(function() {
		var picClass= ["example0 ", "example1 ", "example2 "];
	    var block = "Block ";
	    var classSize = ["p", "img", "a"];

		var Pane = function() {
			this.Initialize();
			this.getPuzzleSize();
			this.listenButtonClicks();
		}

		var protos = Pane.prototype;
		protos.permit = true;
		protos.picId = ["ex0", "ex1", "ex2"];
		protos.Images = [];
		protos.ans = false;
		protos.pos = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,true, true, true, true, true, true,true, true, true];
		
		protos.Initialize = function() {
			$("#step").val(0);
            $("#showStep, #R1, #R2, #Start, #ex0, #ex1, #ex2").hide();
		}

		protos.getPuzzleSize = function() {
			for (let f = 3; f < 6; f++) {
                var str = "#b" + f.toString();
                var that = this;
                $(str).click(function() {
                    that.size = f; //get the size
                    that.dels(); //delete the size button
                    that.showPictures();
                })
            }
		}
		protos.listenButtonClicks = function() {
			this.StartButtonClick();
			this.resizeButtonClick();
			this.rechoosePictureButtonClick();
		}
		protos.dels = function() {
			$("#choice, #first").hide();
		}
		protos.showPictures = function() {
			this.getPictures();
			for (let q = 0; q < 3; q++) {
				var that = this;
                var picIdentity = "#"+this.picId[q];
                $(picIdentity).click(function() {
                	that.puzzle = q;
                    that.choosePicture();
                });
            }
		}

		protos.getPictures = function() {
			$("#ex0, #ex1, #ex2, #R2").show();
		}

		protos.choosePicture = function() {
			if (this.permit) {
                document.getElementById("ex"+this.puzzle.toString()).className = "Big";    
                this.formingPuzzle();//forming puzzle
                this.permit = false;
            }
		}

		protos.formingPuzzle = function() {
			$("#Start, #R1, #showStep").show();
			this.setBasicSymbolNumber();
			this.getImages();
		}

		protos.setBasicSymbolNumber = function() {
			this.sum = this.size*this.size;
			this.maxnumber = this.sum-1;
		}
		protos.getImages = function() {
            this.createTiles();
		}

		protos.createTiles = function() {
			var fragss = document.createDocumentFragment();
                for (var i = 0; i < this.sum; i++) {
                    element = document.createElement('div');
                    element.x = Math.floor(i/this.size);
                    element.y = i % this.size;
                    element.className = block+picClass[this.puzzle] + classSize[this.size-3] + i.toString();
                    this.Images.push(element);
                    fragss.appendChild(element);
                }
                $("#pictures").append(fragss);
                document.getElementById("showStep").className = "act";
		}

		protos.StartButtonClick = function() {
			var that = this;
			$("#Start").click(function() {
                that.count = 0;
                $("#step").val(that.count.toString());
                that.randomTiles();
                $("#Start").html("Restart");
                if (that.ans) {
                    $("#result").empty();
                    that.ans = false;
                }
                that.listenTilesClicks();
            });  
		}

		protos.resizeButtonClick = function() {
			var that = this;
			$("#R2").click(function() {
                that.clearPuzzle();
                $("#showStep, #R1, #R2, #Start, #ex0, #ex1, #ex2").hide();
                $("#choice").show();
            });   
		}

		protos.rechoosePictureButtonClick = function() {
			var that = this;
			$("#R1").click(function() {
	            that.clearPuzzle();
	            $("#Start, #R1, #showStep").hide();
	            $("#step").val(0);
	        });    
		}

		protos.clearPuzzle = function() {
			$("#pictures").empty();
            this.permit = true;
            while (this.Images.length!=0) {
                this.Images.pop();
            }
            document.getElementById("ex"+this.puzzle.toString()).className = "show";
		}
		protos.randomTiles = function() {
			this.resetFlag();
			this.getOriginallyRandomTiles();
			this.canbeSovled();
			this.finalSetPuzzle();
		}
		protos.resetFlag = function() {
			for (var j = 0; j < this.sum; j++) {
                this.pos[j] = true;
            }
		}

		protos.getOriginallyRandomTiles = function() {
			for (var g = 0; g < this.sum; g++) {
                this.Images[g].picture = this.Random();
                while (true) {
                    if (this.pos[this.Images[g].picture]) {
                        this.pos[this.Images[g].picture] = false;
                        break;
                    } else {
                        this.Images[g].picture = this.Random();
                    }
                }
            }
		}

		protos.Random = function() {
			return Math.floor(Math.random()*this.sum);
		}

		protos.canbeSovled = function() {
			var Inv = this.NeedChangeInverseNumberOrNot();
			if (Inv) {
				var h = this.Images[this.sum-1].picture;
                this.Images[this.sum-1].picture = this.Images[this.sum-2].picture;
                this.Images[this.sum-2].picture = h;
			}
		}
		protos.NeedChangeInverseNumberOrNot = function() {
			var coverPairCount = 0, d = 0;
            for (var i = 0; i < this.sum; i++) {
                if (this.Images[i].picture == this.maxnumber) d = this.Images[i].x + this.Images[i].y;
                for (var j = i+1; j < this.sum; j++) {
                    if(this.Images[i].picture > this.Images[j].picture) {
                        ++coverPairCount;
                    }
                }
            }
            if ((coverPairCount&1) == (d&1)) return true;
            return false;
		}

		protos.finalSetPuzzle = function() {
			for (k = 0; k < this.sum; k++) {
                if (this.Images[k].picture == this.maxnumber) {
                    this.EmptyY = this.Images[k].y;
                    this.EmptyX = this.Images[k].x;
                }
                this.Images[k].className = block+picClass[this.puzzle]+ classSize[this.size-3]+ this.Images[k].picture.toString(); 
            }
		}

		protos.listenTilesClicks = function() {
			for (let t = 0; t < this.sum; t++) {
				var that = this;
				
                this.Images[t].onclick = function() {
                    if (that.isCloseToEmpty(that.Images[t])) {
                        var tempClassName = that.Images[that.EmptyX*that.size+that.EmptyY].className;
                        that.Images[that.EmptyX*that.size+that.EmptyY].className = that.Images[t].className;
                        that.Images[t].className = tempClassName;
                        that.Images[that.EmptyX*that.size+that.EmptyY].picture = that.Images[t].picture;
                        that.Images[t].picture = that.maxnumber;
                        that.EmptyX = that.Images[t].x;
                        that.EmptyY = that.Images[t].y;
                        ++that.count;
                        $("#step").val(that.count.toString());
                        that.JudgeIfSuccess();
                    }
                }
            }
		}

		protos.isCloseToEmpty = function(puz) {
			if ((this.EmptyX == puz.x && (Math.abs(this.EmptyY-puz.y)==1) || (this.EmptyY == puz.y && Math.abs(this.EmptyX-puz.x)==1)))
                return true;
            return false;
		}

		protos.JudgeIfSuccess = function() {
			for (var p = 0; p < this.sum; p++) {
                if (this.Images[p].picture != (this.Images[p].x*this.size+this.Images[p].y)) return;
            }
            var element = document.createElement("p");
            element.id = "congratulate";
            $("#congratulate").html("You Win!And you step" + this.count.toString()+"times");
            $("#result").append(element);
            this.ans = true;
		}
		$(function() {
			new Pane();
		})
	})();
}