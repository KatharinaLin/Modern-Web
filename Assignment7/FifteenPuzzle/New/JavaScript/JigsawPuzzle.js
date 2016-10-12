window.onload = function() {
    var Images = [], pic = [];
    var pos = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,true, true, true, true, true, true,true, true, true];
    var ans = false, permit = true, Finish = true;
    var count = 0, size = 0, puzzle, EmptyX = size, EmptyY = size;
    var picId = ["ex0", "ex1", "ex2"];
    var picClass= ["example0 ", "example1 ", "example2 "];
    var block = "Block ";
    var classSize = ["p", "img", "a"];
    Inicialize();

    function Inicialize() {
        $("#step").val(0);
        $("#showStep, #R1, #R2, #Start, #ex0, #ex1, #ex2").hide();
        getSize();

        
        //set the puzzle size
        function getSize() {
            //choose the picture again
            Rechoose();

            //when press the size button, the web changed
            for (let f = 3; f < 6; f++) {
                var str = "#b" + f.toString();
                $(str).click(function() {
                    size = f; //get the size
                    del(); //delete the size button
                    PictureShow(); //show the pictures
                })
            }

            function PictureShow() {
                getPictures();
                
                //when the picture is clicked, the puzzle is forming
                for (let q = 0; q < 3; q++) {
                    var picIdentity = "#"+picId[q];
                    $(picIdentity).click(function() {
                        if (permit) {
                            document.getElementById("ex"+q.toString()).className = "Big";
                            puzzle = q;
                            Dealing(size, puzzle);//forming puzzle
                            permit = false;
                            return permit;
                        }
                    });
                }
                $("#R2").click(function() {
                    clearPuzzle();
                    $("#showStep, #R1, #R2, #Start, #ex0, #ex1, #ex2").hide();
                    $("#choice").show();
                });     
            }

            function getPictures() {
                $("#ex0, #ex1, #ex2, #R2").show();
            }

            //button delete function
            function del() {
                $("#choice").hide();
                $("#first").hide();
            }
            
            //first delete the current puzzle, and change the status of the other buttons
            function Rechoose() {
                $("#R1").click(function() {
                    clearPuzzle();
                    $("#Start, #R1, #showStep").hide();
                    $("#step").val(0);
                    return permit;
                });       
            }
            function clearPuzzle() {
                $("#pictures").empty();
                permit = true;
                while (Images.length!=0) {
                    Images.pop();
                }
                document.getElementById("ex"+puzzle.toString()).className = "show";
            }
            //Puzzle dealing
            function Dealing(size, puzzle) {
                $("#Start, #R1, #showStep").show();
                var sum = size*size;
                var maxnumber = sum-1;

                Images = getImages();
                Begin();
                var h = new Action();
                
                //get pieces of the image
                function getImages() {
                    var fragss = document.createDocumentFragment();
                    for (var i = 0; i < sum; i++) {
                        element = document.createElement('div');
                        element.x = Math.floor(i/size);
                        element.y = i % size;
                        element.className = block+picClass[puzzle] + classSize[size-3] + i.toString();
                        
                        Images.push(element);
                        fragss.appendChild(element);
                    }
                    $("#pictures").append(fragss);
                    document.getElementById("showStep").className = "act";
                    return Images;
                }
                
                //get a random position
                var Random = function () {
                    return Math.floor(Math.random()*sum);
                }

                //reset the current flag array
                var resetFlag = function() {
                    for (var j = 0; j < sum; j++) {
                        pos[j] = true;
                    }
                }

                //get a random arrangment of the puzzle
                var Mess = function() {
                    var reset = new resetFlag();
                    for (var g = 0; g < sum; g++) {
                        Images[g].picture = Random();
                        while (true) {
                            if (pos[Images[g].picture]) {
                                pos[Images[g].picture] = false;
                                break;
                            } else {
                                Images[g].picture = Random();
                            }
                        }
                    }
                    CanbeSolved();
                    FinalRandomPuzzle();

                    //judge whether it has a solution, if not, let it be
                    function CanbeSolved() {
                        var coverPairCount = 0;
                        var d = 0;
                        for (var i = 0; i < sum; i++) {
                            if (Images[i].picture == maxnumber) d = Images[i].x + Images[i].y;
                            for (var j = i+1; j < sum; j++) {
                                if(Images[i].picture > Images[j].picture) {
                                    ++coverPairCount;
                                }
                            }
                        }
                        if ((coverPairCount&1) == (d&1)) {
                            //change it into an odd one
                            var h = Images[sum-1].picture;
                            Images[sum-1].picture = Images[sum-2].picture;
                            Images[sum-2].picture = h;
                        }
                    }

                    //finally get all arranged
                    function FinalRandomPuzzle() {
                        for (k = 0; k < sum; k++) {
                            if (Images[k].picture == maxnumber) {
                                EmptyY = Images[k].y;
                                EmptyX = Images[k].x;
                            }
                            Images[k].className = block+picClass[puzzle]+ classSize[size-3]+ Images[k].picture.toString();
                            
                        }
                    }
                }

                //what will happen if a start button be pressed
                function Begin() {
                    $("#Start").click(function() {
                        count = 0;
                        $("#step").val(count.toString());
                        var mess = new Mess();
                        $("#Start").html("Restart");
                        if (ans) {
                            $("#result").empty();
                            ans = false;
                        }
                    });  
                }
    
                //when a puzzle piece was clicked, happen...
                function Action() {
                    for (let t = 0; t < sum; t++) {
                        Images[t].onclick = function() {
                            if (isCloseToEmpty(Images[t])) {
                                var tempClassName = Images[EmptyX*size+EmptyY].className;
                                Images[EmptyX*size+EmptyY].className = Images[t].className;
                                Images[t].className = tempClassName;
                                Images[EmptyX*size+EmptyY].picture = Images[t].picture;
                                Images[t].picture = maxnumber;
                                EmptyX = Images[t].x;
                                EmptyY = Images[t].y;
                                ++count;
                                $("#step").val(count.toString());
                                Judge();
                            }
                        }
                    }
                }
                function isCloseToEmpty(puz) {
                    if ((EmptyX == puz.x && (Math.abs(EmptyY-puz.y)==1) || (EmptyY == puz.y && Math.abs(EmptyX-puz.x)==1)))
                        return true;
                    return false;
                }

                //Judge whether the puzzle is finished
                function Judge() {
                    for (var p = 0; p < sum; p++) {
                        if (Images[p].picture != (Images[p].x*size+Images[p].y)) return false;
                    }
                    var element = document.createElement("p");
                    element.id = "congratulate";
                    $("#congratulate").html("You Win!And you step" + count.toString()+"times");
                    $("#result").append(element);
                    ans = true;
                    return true;
                }
            }
        }
    } 
}
