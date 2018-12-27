$(function() {
	$("#regPromLink").val(getQueryString("promotionlink") || '');

	// 自定义方法，验证只能输入英文字母和数字
	$.validator.addMethod("stringCheck", function(value, element) {
		return this.optional(element) || /^[0-9a-zA-Z]+$/.test(value);
	}, "只能包括英文字母和数字");

	// 默认行为
	$.validator.setDefaults({
		submitHandler : function() {
			alert("提交事件!"); 
		}
	});

	// 添加规则
	$("#registerForm").validate({
		rules : {
			userName : "required",
			loginName : {
				required : true,
				rangelength : [ 4, 12 ],
				stringCheck : true,
			},
			userPassword : {
				required : true,
				rangelength : [ 6, 12 ],
				stringCheck : true
			},
			passwordConfirm : {
				required : true,
				equalTo : "#password"
			},
			email : {
				email : true
			}
		}
	});

	$('.btn-submit').on('click', function(e) {
		if ($("#registerForm").valid()) {
			var reg = $("#regPromLink").val()?"/promLink/register":"/register";
			$.ajax({
				url : reg,
				type : 'POST',
				dataType : 'json',
				data : $('#registerForm').serialize(),
				contentType : 'application/x-www-form-urlencoded',
				success : function(data) {
					if (0 === data.retcode) {
						popTips('恭喜您，注册成功！', 'succeed', "", function() {
							location.href = "/";
						});
					} else {
						popTips(data.retmsg, "error");
					}
				}
			});
		}
	});

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	}
});