$(document).ready(function() {
	var ordertime = 60; //设置再次发送验证码等待时间
	var timeleft = ordertime;
	//计时函数
	function timeCount() {
		timeleft -= 1
		if(timeleft > 0) {
			$('#code').val(timeleft + " 秒后重发");
			setTimeout(timeCount, 1000)
		} else {
			$('#code').val("重新发送");
			timeleft = ordertime //重置等待时间
			$('#code').removeAttr("disabled");
		}
	};
	//监听手机号码输入框值得改变
	$('#phoneNum').on('input propertychange', function() {

		var count = Number($(this).val().length);//获取输入值长度
		var result = $.trim($(this).val());//获取输入值
		var res = /^[1][3,4,5,7,8][0-9]{9}$/; //电话号码的正则匹配式

		if(count === 11) {
			if(!res.test(result)) {
				alert('您输入的手机号码不正确')
			} else {

				$("#code").css('color', 'black');
				$("#code").attr('disabled', false);
				//点击获取验证码按钮后，向后台发起请求
				$('#code').on('click', function() {
					timeCount(this);
					$(this).attr("disabled", true); //防止多次点击
					var phoneNumber = $('#phoneNum').val();

					$.ajax({
						type: "post",
						url: "",
						headers: {
							'Content-Type': 'application/json'
						},
						async: false,
						data: phoneNumber,
						success: function() {

						},
						error: function() {

						}
					});
					//					timeCount(this);
				})
			};

		} else if(count != 11) {
			$("#code").css('color', 'grey')
		}
	});
	//点击马上预定，向后台提交用户注册资料
	$('#sure').on('click', function() {
		var phoneNumber = $('#phoneNum').val();
		var inputCode = $('#inputCode').val();
		 //向后台提交数据
             $.ajax({  
                url : base + "/",
                type: "POST",
               // dataType: "text",  
               // data: "phones=" + phone + "&code=" + code,   
                dataType: "JSON",
                data:{
                    phones:phoneNumber,
                    code:inputCode
                },
                success: function (data){
                    
                },
                error:function(){
                	
                }
            });
		window.location.href = 'second.html'
	});
	//点击马上支付按钮后，向后台请求调起微信支付
	$('#payNow').on('click', function() {
		window.location.href = 'three.html'
		$.ajax({　　
			url: '向后台的请求url地址。。。。',
			　　type: 'get',
			　　dataType: 'json',
			　success: function(data) {　　　
				if(获取数据成功) {

					　　　　　　
					var appIdVal = data.data.appId;　　　　　　

					　　　　　　
					var timeStampVal = data.data.timeStamp;

					　　　　　　
					var nonceStrVal = data.data.nonceStr;　　　　　　
					var packageVal = data.data.package;　　　　　　
					var signTypeVal = data.data.signType;　　　　　　
					var paySignVal = data.data.sign;　　　　　　
					onBridgeReady();　　　　　　
					function onBridgeReady() {　　　　　　　　
						WeixinJSBridge.invoke(　　　　　　　　　　
							'getBrandWCPayRequest', {　　　　　　　　　　
							"appId": appIdVal, //公众号名称，由商户传入 
							"timeStamp": timeStampVal, //时间戳，自1970年以来的秒数 
							"nonceStr": nonceStrVal, //随机串 
							"package": packageVal, //订单详情扩展字符串
							"signType": signTypeVal, //微信签名方式： 
							"paySign": paySignVal //微信签名 
								　　　　　　　　
							}, 　　　　　
							function(res) {　　　　　　　　
								if(res.err_msg == "get_brand_wcpay_request:ok") {// 表示已经支付,res.err_msg将在用户支付成功后返回 ok。 
									　　　　　　　　　　
									window.location.href = 'three.html'　　　　　　　　
								}　　　　　
							}　　　　);　　　　
					}　　　　
					if(typeof WeixinJSBridge == "undefined") {　　　　　　　　
						if(document.addEventListener) {　　　　　　　　　　
							document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);　　　　　　　　
						} else if(document.attachEvent) {　　　　　　　　　　
							document.attachEvent('WeixinJSBridgeReady', onBridgeReady);　　　　　　　　　　
							document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);　　　　　　　　
						}　　　　
					} else {　　　　　　
						onBridgeReady();　　　　
					}

					　　　　
				}　　
			},
			　　error: function() {

				　　}
		})

	});
})