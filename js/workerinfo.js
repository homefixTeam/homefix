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

	//上传身份证
	$file_sfz = $('#my-file-sfz');
	$file_sfz.on('click', function(){
		//上传
		// $(this).parent().submit();
	})
	$('.btn-upload').on('touchend', function(){
		$file_sfz.trigger('click');
	})

	//选择技能（多选）
	$(".my-check .icon-check").on('touchend', function(){
		$(this).toggleClass('uncheck');
	}).next().on('touchend', function(){
		$(this).prev().trigger('touchend');
	})

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
			},
			{ 
				reg: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/, 
				datatype: 'rgn-txtSFZ', 
				msg: ['身份证号码格式输入错误'] 
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