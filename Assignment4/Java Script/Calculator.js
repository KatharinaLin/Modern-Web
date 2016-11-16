var show = true;
window.onload = function() {
    ClearAll();
}

function ClearAll() {
    document.getElementById("Show").value = "";
    show = true;
}

function ShowAnswer(var1) {
    var Look = document.getElementById("Show").value;
    if (show) {
        document.getElementById("Show").value = (Look+var1);
    } else {
        show = true;
        document.getElementById("Show").value = var1;
    }
}

//when click the button, something will be shown
document.getElementById("Clear").onclick=function() {
    ClearAll();
}
document.getElementById("Delete").onclick=function() {
    var Look = document.getElementById("Show").value;
    if (Look.length == 1) {
        ClearAll();
    } else {
        document.getElementById("Show").value = Look.substr(0, Look.length-1);
    }
}
var buttons = document.getElementsByClassName("button");
for (var i = 0, j = buttons.length; i < j; i++) {
    buttons[i].onclick = function() {
        ShowAnswer(this.value);
    }
}


document.getElementById("OperatorEqual").onclick=function() { 
    var str = document.getElementById("OperatorEqual").value;
    ShowAnswer(str);
    var Look = document.getElementById("Show").value;
    if (isValid(Look)) {
        getAnswer(Look);
    }
}

//judging the input is valid or not 

//judge a char is a operator or not
function isOperator(str) {
    if (str == "(" || str == ")" || str == "+" || str == "-" || str == "*" ||  str == "/" || str == ".")return true;
    return false;
}

//judging is a dot point valid or not
function isDotValid(Look) {
    try {
        var Operators = new Array();
        for (var i = 0; i < Look.length; i++) {
            if (isOperator(Look[i])) {
                Operators.push(Look[i]);
            }
        }
        var flag = -1, count = 0;
        for (i = 0; i < Operators.length; i++) {
            if (Operators[i] == ".") {
                if (count == 0) {
                    count = 1;
                    flag = i;
                } else {
                    if (i - flag != 1) {
                        flag = i;
                    } else {
                        throw "Dot is invalid!";
                        return false;
                    }
                }
            }
        }
        return true;
    }
    catch(Error) {
        alert(Error);
        ClearAll();
    }
}

//judging is a pair of brackets valid or not
function isBracketValid(Look) {
    try {
        var Bracket = new Array();
        for (var i = 0; i < Look.length; i++) {
            if (Look[i] == "(" || Look[i] == ")") {
                Bracket.push(Look[i]);
            }
        }
        if (Bracket.length % 2 != 0) throw "odd Brackets";
        var count1 = 0, count2 = 0;
        for (i = 0; i < Bracket.length; i++) {
            if (Bracket[i] != "(") {
                ++count1;
            }
            if (Bracket[i] != ")") {
                ++count2;
            }
        }
        if (count2 != count1) throw "Brackets dispair";
        return true;
    }
    catch(Error) {
        alert(Error);
        ClearAll();
    }
}

//find it is whether the basic operating operator
function isBasicOperator(str) {
    if (str == "+" || str == "-" || str == "*" || str == "/") return true;
    return false;
}

//judging whether the operators are valid
function isOperatorValid(Look) {
    try {
        if (isBasicOperator(Look[0]) || isBasicOperator(Look[Look.length-2])) throw "Operator can not be at the beginning or at the last";
        var OperatorSub = new Array();
        for (var i = 0; i < Look.length; i++) {
            if (isBasicOperator(Look[i])) {
                OperatorSub.push(i);
            }
        }
        for (var j = 0; j < OperatorSub.length; j++) {
            if (j > 0) {
                if (OperatorSub[j] - OperatorSub[j-1] == 1) throw "Operator can not be close to each other";
            }
        }
        for (i = 0; i < Look.length; i++) {
            if ((Look[i] == "(" && isBasicOperator(Look[i+1]))) {
                throw "Operator are wrong with Bracket";
            }
            if (i > 0) {
                if ((Look[i] == ")" && isBasicOperator(Look[i-1]))||(Look[i] == ")" &&Look[i+1] == ".")) {
                    throw "Operator are wrong with Bracket";
                }
                if (Look[i] == "(" && Look[i-1] == ".") {
                    throw "Operator error with dot";
                }
            }
        }
        return true;
    }
    catch(Error) {
        alert(Error);
        ClearAll();
    }
}

//judging logic error
function isDividerValid(Look) {
    try {
        for (var i = 0; i < Look.length; i++) {
            if (Look[i] == "/") {
                if (Look[i+1] == "0") throw "Divider can not be 0";
            }
        }
        return true;
    }
    catch(Error) {
        alert(Error);
        ClearAll();
    }
}

//judging the whole one is valid or not
function isValid(Look) {
    if (!isDotValid(Look)) return false;
    if (!isBracketValid(Look)) return false;
    if (!isOperatorValid(Look)) return false;
    if (!isDividerValid(Look)) return false;
    return true;
}


//computing the mathmatics answer by Reverse Polish notation
//first change a formular like 3+4-5 to 34+5-, the calculate it

function isOperators(str){
    if (str == "(" || str == ")" || str == "+" || str == "-" || str == "*" ||  str == "/")return true;
    return false;
}

function getPriority(operator){
    switch(operator){
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return 0;
    }
}

function ComparePriority(operator1, operator2){
    if (getPriority(operator1) > getPriority(operator2)) return true;
    return false;
}

function getAnswer(Look) {
    var datas = new Array();
    var OperatorStack = new Array();
    var DataStack = new Array();

    //save datas in an array;
    var flag = 0;
    for (var i = 0; i < Look.length-1; i++) {

        if (isOperators(Look[i])) {
            if (i != flag) {
                datas.push(Look.substr(flag, i-flag));
            }
            datas.push(Look[i]);
            flag = i+1;
        }
    }
    if (flag != Look.length-1) datas.push(Look.substr(flag, Look.length-1-flag));

    //push data into stack
    for (i = 0; i < datas.length; i++) {
        if (!isOperators(datas[i])) {
            DataStack.push(datas[i]);
        } else {
          if (isBasicOperator(datas[i])) {
            while (true) {
                if (OperatorStack.length == 0) {
                    OperatorStack.push(datas[i]);
                    break;
                } else if (OperatorStack[OperatorStack.length-1] == "(") {
                    OperatorStack.push(datas[i]);
                    break;
                } else if (ComparePriority(datas[i], OperatorStack[OperatorStack.length-1])) {
                    OperatorStack.push(datas[i]);
                    break;
                } else {
                    DataStack.push(OperatorStack.pop());
                }
            }
          } else if (datas[i] == "(") {
            OperatorStack.push(datas[i]);
          } else if (datas[i] == ")") {
            while (OperatorStack[OperatorStack.length-1] != "(") {
                
                DataStack.push(OperatorStack.pop());
            }
            OperatorStack.pop();
          }
        }

    }
    while (OperatorStack.length != 0) {
        DataStack.push(OperatorStack.pop());
    }

    //Start Computing
    var Computation = new Array();
    var number, num1, num2;
    for (i = 0; i < DataStack.length; i++) {
        
        if (!isBasicOperator(DataStack[i])) {
            number = parseFloat(DataStack[i]);
            Computation.push(number);

        } else {
            num1 = Computation.pop();
            num2 = Computation.pop();
            switch(DataStack[i]) {
                case "+":
                    Computation.push(num2 + num1);
                    break;
                case "-":
                    Computation.push(num2 - num1);
                    break;
                case "*":
                    Computation.push(num2 * num1);
                    break;
                case "/":
                    Computation.push(num2 / num1);
                    break;
            }
        }
    }
    show = false;
    var sstr = Computation[0].toString();
    if (sstr.length > 10) sstr = Computation[0].toFixed(10);
    document.getElementById("Show").value=(Look+sstr);
}