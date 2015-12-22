$(function(){

	var vali_Obj = {
		"txtLength":{
			n: "请输入长度",
			t: "长度不超过{0}字",
			g: "请输入正确的长度格式"
		},
		"txtHeight":{
			n: "请输入高度",
			t: "高度不能超过{0}",
			g: "请输入正确的高度格式"
		},
		"txtWidth":{
			n: "请输入宽度",
			t: "宽度不能超过{0}",
			g: "请输入正确的宽度格式"
		}
	};
	
	$(".fw-cal-par li").find('input').on("blur",function(){

		$(this).closest('li').removeClass('input-error');

		var dataVali = $(this).attr("data-vali");
		var dataMax = $(this).attr("data-max");
		var reg = /\d+/g;
		var thisVal = $(this).val();

		if(thisVal==""){
			setTip.call(this, 'n');
		}else if(!reg.test(thisVal)){
			setTip.call(this, 'g');
		}else if(parseInt(thisVal) > parseInt(dataMax)){
			setTip.call(this, 't', dataMax);
		}

		function setTip(type, replaceVal){
			var _errorMsg = vali_Obj[dataVali][type];
			if(replaceVal){
				_errorMsg = _errorMsg.replace(/\{0\}/g, replaceVal);
			}
			$(this).closest('li').addClass('input-error');
			$(this).closest("li").find('.input-tip').html(_errorMsg);
		}
		
	});

	//add
	$('.fw-cal-par').on('touchend', '.fa-plus-square-o', function(){
		var $this = $(this),
			$parLi = $this.closest('li');

		var liHtml = '<li class="cf">' + $parLi.html().replace('fa-plus', 'fa-minus') + '</li>';
		$parLi.after(liHtml);

	}).on('touchend', '.fa-minus-square-o', function(){
		var $this = $(this),
			$parLi = $this.closest('li');

		$parLi.remove();

	}).on('touchend', '.icon-check', function(){
		//选择框
		var $this = $(this);
		$checkPar = $this.closest('.fw-checked');
		$checkPar.find('.icon-check').addClass('uncheck');

		$this.removeClass('uncheck');
	}).on('touchend', '.fw-checked span', function(){

		$(this).prev().trigger('touchend');

	})

})