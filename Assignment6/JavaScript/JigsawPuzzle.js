window.onload = function() {
    var Images = [];
    var pos = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,true, true, true, true, true, true,true, true, true];
    var Finish = true;
    var pic = [];
    var puzzle;
    var ans = false;
    var permit = true;
    var count;
    var size = 0;
    var picClass= ["example0 ", "example1 ", "example2 "];
    var EmptyX = size, EmptyY = size;
    getButton();

    function getButton() {
        createButtons();
        getSize();

        //create the size buttons
        function createButtons() {
            var frag = document.createDocumentFragment();
            var element = document.createElement("p");
            element.innerHTML = "Click the button and choose a Jigsaw Puzzle size~";
            frag.appendChild(element);
            var n;
            for (var m = 0; m < 3; m++) {
                element = document.createElement("button");
                n = m + 3;
                element.id = "b" + n.toString();
                element.innerHTML = n.toString() + "x" +n.toString();
                frag.appendChild(element);
            }
            document.getElementById("choice").appendChild(frag);
        }


        //set the puzzle size
        function getSize() {
            //choose the picture again
            Rechoose();

            //when press the size button, the web changed
            for (let f = 3; f < 6; f++) {
                document.getElementById("b"+f.toString()).addEventListener("click", function() {
                    size = f; //get the size
                    del(); //delete the size button
                    PictureShow(); //show the pictures
                })
            }

            function PictureShow() {

                //get the pictures
                var frags = document.createDocumentFragment();
                for (var m = 0; m < 3; m++) {
                    var element = document.createElement("img");
                    element.className = "show";
                    element.id = "ex"+m.toString();
                    if (m == 0) element.src = "../image/Lovely.jpg";
                    else if (m == 1) element.src = "../image/panda.jpg";
                    else element.src = "../image/cat.jpg";
                    pic.push(element);
                    frags.appendChild(element);
                }
                document.getElementById("selectShow").appendChild(frags);

                //when the picture is clicked, the puzzle is forming
                for (let q = 0; q < 3; q++) {
                    document.getElementById("ex"+q.toString()).addEventListener("click", function() {
                        if (permit) {
                            document.getElementById("ex"+q.toString()).className = "Big";
                            puzzle = q;
                            Dealing(size, puzzle);//forming puzzle
                            permit = false;
                            return permit;
                        }
                    })
                }     
            }
            
            //button delete function
            function del() {
                var parent = document.getElementById("Whole");
                var child = document.getElementById("choice");
                parent.removeChild(child);
            }
            
            //first delete the current puzzle, and change the status of the other buttons
            function Rechoose() {
                document.getElementById("R1").addEventListener("click",function() {
                    var parent = document.getElementById("pictures");
                    var child = document.getElementById("pic");
                    parent.removeChild(child);
                    permit = true;
                    while (Images.length!=0) {
                        Images.pop();
                    }
                    document.getElementById("ex"+puzzle.toString()).className = "show";
                    document.getElementById("Start").className = "origin";
                    document.getElementById("R1").className = "origin";
                    document.getElementById("showStep").className = "origin";
                    count = 0;
                    document.getElementById("step").value = count.toString();
                    return permit;
                })
                
                    
            }

            //Puzzle dealing
            function Dealing(size, puzzle) {
                document.getElementById("Start").className = "act";
                document.getElementById("R1").className = "act";
                var sum = size*size;
                var maxnumber = sum-1;

                Images = getImages();
                Begin();
                var h = new Action();
                
                //get pieces of the image
                function getImages() {
                    var element = document.createElement("div");
                    element.id = "pic";
                    document.getElementById("pictures").appendChild(element);
                    var fragss = document.createDocumentFragment();
                    for (var i = 0; i < sum; i++) {
                        element = document.createElement('div');
                        element.x = Math.floor(i/size);
                        element.y = i % size;
                        if (size == 4) element.className = "Block "+picClass[puzzle]+("img") + i.toString();
                        else if (size == 3) element.className = "Block "+picClass[puzzle]+"p" + i.toString();
                        else if (size == 5) element.className = "Block "+picClass[puzzle]+"a" + i.toString();
                        Images.push(element);
                        fragss.appendChild(element);
                    }
                    document.getElementById("pic").appendChild(fragss);
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

                    //judge whether it has a solution, if not, let it be
                    var coverPairCount = 0;
                    var d = 0;
                    for (var i = 0; i < sum; i++) {
                        if (Images[i].picture == maxnumber) {
                            d = Images[i].x + Images[i].y;
                        }
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

                    //finally get all arranged
                    for (k = 0; k < sum; k++) {
                        if (Images[k].picture == maxnumber) {
                            EmptyY = Images[k].y;
                            EmptyX = Images[k].x;
                        }
                        if (size == 4) Images[k].className = "Block "+picClass[puzzle]+ ("img") + Images[k].picture.toString();
                        else if (size == 3) Images[k].className = "Block "+picClass[puzzle]+("p") + Images[k].picture.toString();
                        else if (size == 5) Images[k].className = "Block "+picClass[puzzle]+("a") + Images[k].picture.toString();
                    }
                }

                //what will happen if a start button be pressed
                function Begin() {
                    document.getElementById("Start").addEventListener("click", function() {
                        count = 0;
                        document.getElementById("step").value = count.toString();
                        var mess = new Mess();
                        document.getElementById("Start").innerHTML = "Restart";
                        if (ans) {
                            var parent = document.getElementById("result");
                            var child = document.getElementById("congratulate");
                            parent.removeChild(child);
                            ans = false;
                        }
                    });  
                }
    
                //when a puzzle piece was clicked, happen...
                function Action() {
                    for (let t = 0; t < sum; t++) {
                        Images[t].onclick = function() {
                            if (EmptyY != Images[t].y || EmptyX != Images[t].x) {
                                if ((Math.abs(EmptyY-Images[t].y)<=1 && Math.abs(EmptyX-Images[t].x)<=1)&&(!(Math.abs(EmptyY-Images[t].y)==1 && Math.abs(EmptyX-Images[t].x)==1))) {
                                    Images[EmptyX*size+EmptyY].className = Images[t].className;
                                    Images[EmptyX*size+EmptyY].picture = Images[t].picture;
                                    Images[t].picture = maxnumber;
                                    EmptyX = Images[t].x;
                                    EmptyY = Images[t].y;
                                    ++count;
                                    document.getElementById("step").value = count.toString();
                                    if (size == 4) Images[t].className = "Block "+picClass[puzzle]+"img"+maxnumber.toString();
                                    else if (size == 3) Images[t].className = "Block "+picClass[puzzle]+"p"+maxnumber.toString();
                                    else if (size == 5) Images[t].className = "Block "+picClass[puzzle]+"a"+maxnumber.toString();
                                    Judge();
                                }
                            }       
                        }
                    }
                }
                
                //Judge whether the puzzle is finished
                function Judge() {
                    var name,str;
                    for (var p = 0; p < sum; p++) {
                        if (Images[p].picture != (Images[p].x*size+Images[p].y)) return false;
                    }
                    var element = document.createElement("p");
                    element.id = "congratulate";
                    element.innerHTML = "You Win!And you step" + count.toString()+"times";
                    document.getElementById("result").appendChild(element);
                    ans = true;
                    return true;
                }
            }
        }
    } 
}
