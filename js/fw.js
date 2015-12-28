$(function(){

	var vali_Obj = {
		'n': "请输入{name}",
		't': "{name}不超过{max}字",
		'g': "请输入正确的{name}格式"
	};
	
	$(".fw-cal-par").on("blur", "li input", function(){

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
	var $parentBox = $(".fw-cal-par"),
		maxUl = $parentBox.attr('data-max') || 5,
		minUl = 1;
	$parentBox.on('touchend', '.input-update .add', function(){
		var $this = $(this);
		if($this.hasClass('enable')){
			return;
		}

		var $ul = $this.closest('ul');
		var $_new = $ul.clone();
		$ul.after($_new);
		$_new.find('li').removeClass('input-error');
        $_new.find('input').val('');

		setEnableStyle();
	});
	//del
	$parentBox.on('touchend', '.input-update .del', function(){
		var $this = $(this);
		if($this.hasClass('enable')){
			return;
		}

		var $ul = $this.closest('ul');
		$ul.remove();

		setEnableStyle();
	});

	function setEnableStyle(){
		var $_ul = $parentBox.find('ul');
		var $_add = $_ul.find('.input-update .add');
		var $_del = $_ul.find('.input-update .del');
		var _num = $_ul.length;
		if(_num >= maxUl){
			$_add.addClass('enable');
		}else{
			$_add.removeClass('enable');
		}
		if(_num <= minUl){
			$_del.addClass('enable');
		}else{
			$_del.removeClass('enable');
		}
	}


})