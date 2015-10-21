$(function(){
	//上传头像
	$file_img = $('#my-file-img');
	$file_img.on('click', function(){
		//上传
		// $(this).parent().submit();
	})
	$('.my-headimg img').on('touchend', function(){
		$file_img.trigger('click');
	})

	//选择年龄（单选）
	var $arrCheck = $(".my-check .icon-check");
	$arrCheck.on('touchend', function(){
		$arrCheck.addClass('uncheck');
		$(this).removeClass('uncheck');
	}).next().on('touchend', function(){
		$(this).prev().trigger('touchend');
	});

	//提交
	$(".submit .input-submit").on('touchend', function(){
		var valiResult = vali();
		if(valiResult && valiResult.error == 1){
			return;
		}

		//验证通过走ajax
		//......
	})

	//验证
	function vali(){

		var $error = $('.info-error');
		$error.hide();

		var $arrInput = $('.my-info li'),
		arr_vali = [
			{ 
				reg: /^[\u4e00-\u9fa5]{2,20}$/g, 
				datatype: 'rgn-txtName', 
				msg: ['姓名格式输入错误，2-20个汉字'] 
			},
			{ 
				reg: /^1[34578][0-9]{9}$/g, 
				datatype: 'rgn-txtPhone', 
				msg: ['手机号格式输入错误'] 
			}
		];

		for(var i = 0; i < arr_vali.length; i++){
			if(valiItem(i) != ''){
				return { error: 1 };
			}
		}

		function valiItem(i){
			var reg = arr_vali[i].reg;
			var $input = $arrInput.find('input[data-type=' + arr_vali[i].datatype + ']');
			var errMsg = '';

			if($input.val() != ""){
				var regResult = !reg.test($input.val());
				if(regResult == true){
					errMsg = arr_vali[i].msg[0];
				}
			}
			if(errMsg != ''){
				$error.show().html(errMsg);
			}else{
				$error.hide();
			}
			
			return errMsg;
		}

	}


})