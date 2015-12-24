$(function(){

	var vali_Obj = {
		'n': "请输入{name}",
		't': "{name}不超过{max}字",
		'g': "请输入正确的{name}格式"
	};
	
	$(".fw-cal-par li").find('input').on("blur",function(){

		$(this).closest('li').removeClass('input-error');

		var dataMax = $(this).attr("data-max");
		var dataName = $(this).attr("data-name");
		var reg = /\d+/g;
		var thisVal = $(this).val();
		var _args = [];

		if(thisVal == ""){
			_args = ['n'];
		}else if(!reg.test(thisVal)){
			_args = ['g'];
		}else if(parseInt(thisVal) > parseInt(dataMax)){
			_args = ['t', dataMax];
		}
		_args.length > 0 && setTip.apply(this, _args);

		function setTip(type, replaceVal){
			var _errorMsg = vali_Obj[type];
			if(replaceVal){				
				_errorMsg = _errorMsg.replace(/\{max\}/g, replaceVal);
			}
			_errorMsg = _errorMsg.replace(/\{name\}/g, dataName);
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