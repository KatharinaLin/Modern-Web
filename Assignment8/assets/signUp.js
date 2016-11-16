window.onload = function() {
	 
	var Signup = new Sign();
	$("input[type=reset]").click(function() {
		$("#remind").val("");
		$("#remind").addClass("hidden");
		$("input[type=text]").removeClass("Wrong");
	});
}

var Sign = function() {
	$("input[type=text]").blur(function(){
		var target = event.target;
		var target_name = $(target).attr('name');
		if (JudgeFormat(target_name, $(target).val())) {
			if ($("input[name = "+target_name+"]").hasClass("Wrong")) {
				$("input[name = "+target_name+"]").removeClass("Wrong");
				$("#remind").addClass("hidden");
			}
		}
	});
}

function JudgeFormat(name, value) {
	RegUserName = /^[a-zA-Z]+[a-zA-Z0-9_]{5,17}$/;
    RegStudentNumber = /^[1-9]+[0-9]{7}$/;
    RegPhoneNumber = /^[1-9]+[0-9]{10}$/;
    RegEmail = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/;
    var flag = true;
	if (name === 'user_name') {
		if (!RegUserName.test(value)) {
			$("#remind").removeClass("hidden");
			$("#remind").val("用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
			flag = false;
		}
	}

	if (name === 'student_number') {
		if (!RegStudentNumber.test(value)) {
			$("#remind").removeClass("hidden");
			$("#remind").val("学号8位数字，不能以0开头");
			flag = false;
		}
	}
	if (name === 'phone_number') {
		if (!RegPhoneNumber.test(value)) {
			$("#remind").removeClass("hidden");
			$("#remind").val("电话11位数字，不能以0开头");
			flag = false;
		}
	}
	if (name === 'email') {
		if (!RegEmail.test(value)) {
			$("#remind").removeClass("hidden");
			$("#remind").val("只能出现英文字母或者下划线，服务器为2-4位英文字母");
			flag = false;
		}
	}
	
	if (!flag) $("input[name = "+name+"]").addClass("Wrong");
	return flag;
}


function check(){
	var reminder = "";
	var flag = true;
    if (!JudgeFormat("user_name", document.sign.user_name.value)) {    
        reminder+="user name is incorrect;(用户名6~18位英文字母、数字或下划线，必须以英文字母开头) ";
        flag = false;       
    }
    if (!JudgeFormat("student_number", document.sign.student_number.value)) {
    	reminder+="student number is incorrect;(学号8位数字，不能以0开头) ";
    	flag = false;
    }
    if (!JudgeFormat("phone_number", document.sign.phone_number.value)) {
    	reminder+="phone number is incorrect;(电话11位数字，不能以0开头) ";
    	flag = false;
    }
    if (!JudgeFormat("email", document.sign.email.value)) {
    	reminder+="email address is incorrect;(只能出现英文字母或者下划线，服务器为2-4位英文字母) ";
    	flag = false;
    }
    if (!flag) alert(reminder);
    return flag;
}
