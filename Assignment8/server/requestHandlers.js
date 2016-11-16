var querystring = require("querystring");
var writeLineStream = require('lei-stream').writeLine;
var util = require('util');
var fs = require("fs");
var path = require("path");
var mime = require("./mime").types;


format = function() {
    return util.format.apply(null, arguments);
};


function start(response, postData,querys){
  console.log("Request handler 'start' was called.");
}
function WritePage(response, result) {
	console.log("Request handler 'WritePage' was called.");
    var body ='<!DOCTYPE html>'+
    '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '<link href="./signUp.css" type="text/css" rel="stylesheet" />'+
    '</head>'+
    '<body>'+
    '<p id = "result">'+result+'</p>'+
    '<h1>Sign Up</h1>'+
    '<h2>User Sign Up</h2>'+
    '<div>'+
    '<input type="text" id = "remind" class = "hidden" readonly="readonly" />'+
    '</div>'+
    '<form action="http://localhost:8000/details" method="POST" name = "sign" onSubmit="return check();">'+
    'User Name: <input type="text" name="user_name">  <br />'+
    'Student Number: <input type="text" name="student_number"> <br />'+
    'Phone Number: <input type="text" name="phone_number"> <br />'+
    'email: <input type="text" name="email"> <br />'+
    '<input type="reset" />'+
    '<input type="submit" value="Submit" />'+
    '</form>'+
    '<script type="text/javascript" src = "./signUp.js"></script>'+
    '<script type="text/javascript" src = "./jquery.js"></script>'+
    '</body>'+
    '</html>';
    
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}
function details(response, postData,querys){
  console.log("Request handler 'details' was called.");
  
  post = querystring.parse(postData);
  var str = post.user_name+' '+post.student_number+' '+post.phone_number+' '+post.email+'\n';
  
  
  var data = fs.readFileSync('./assets/input.txt','utf-8');
  var ss = data.toString();

  var users=ss.split('\n');
  var len = users.length;
 

  for (var i = 0; i < len; i++) {
    var info = [];
    info = users[i].split(" ");
    var result = RepeatJudgeMent(info, post,response);
    if (result.length != 0) {
        WritePage(response,result);
        console.log("here is result length");

        return;
    }
  }
  result = JudgeMent(post,response);
  if (result.length != 0) {
        WritePage(response,result);
        return;
  }
  fs.appendFile('./assets/input.txt', str, function () {
      console.log('追加内容完成');
  });
  SetUpDetailPage(response,post);
}

function SetUpDetailPage(response, post) {
  var body = '<!DOCTYPE html>'+
    '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '<link href="./signUp.css" type="text/css" rel="stylesheet" />'+
    '</head>'+
    '<body>'+
    '<h1>Sign Up Details</h1>'+
    '<h2>User Sign Up Details</h2>'+
    '<div id = "show">'+
    '<p>User Name: '+post.user_name + '</p>'+
    '<p>Student Number: '+post.student_number + '</p>'+
    '<p>Phone Number: '+post.phone_number + '</p>'+
    '<p>email: '+post.email + '</p>'+
    '</div>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}

function JudgeMent(post,response) {
    var result = "";
    RegUserName = /^[a-zA-Z]+[a-zA-Z0-9_]{5,17}$/;
    RegStudentNumber = /^[1-9]+[0-9]{7}$/;
    RegPhoneNumber = /^[1-9]+[0-9]{10}$/;
    RegEmail = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/;
    if (!RegUserName.test(post.user_name)) {
      
      result+=("User name format is wrong!\n");
    }
    if (!RegStudentNumber.test(post.student_number)) {
      result+=("Student Number format is wrong!\n");
    }
    if (!RegPhoneNumber.test(post.phone_number)) {
      result+=("Phone Number format is wrong!\n");
    }
    if (!RegEmail.test(post.email)) {
      result+=("Email format is wrong!\n");
    }
    return result;
}

function RepeatJudgeMent(info, post, response) {
  var result = "";
    if (info[0] == post.user_name) {
        result +=("user name :"+info[0]+", is used by others\n");
        
    }
    if (info[1] == post.student_number) {
        result +=("student number :"+info[1]+", is used by others\n");
        
    }
    if (info[2] == post.phone_number) {
        result +=("phone number :"+info[2]+", is used by others\n");
        
    }
    if (info[3] == post.email) {
        console.log(info[3]);
        result +=("email :"+info[3]+", is used by others\n");
        
    }
    return result;
}

function queryUser(response, querys) {
    var data = fs.readFileSync('./assets/input.txt','utf-8');
    var ss = data.toString();
    var users=ss.split('\n');
    var len = users.length;

    for (var i = 0; i < len; i++) {
      var info = [];
      info = users[i].split(" ");
      if (info[0] == querys) {
        var post = {};
        post.user_name = info[0];
        post.student_number = info[1];
        post.phone_number = info[2];
        post.email = info[3];
        SetUpDetailPage(response,post);
        return;
      }
    }
    WritePage(response,"");
}
exports.start = start;
exports.details = details;
exports.queryUser = queryUser;