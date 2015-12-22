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
	var $parentBox = $(".fw-cal-par"),
		maxUl = $parentBox.attr('data-max') || 5,
		minUl = 1;
	$parentBox.on('touchend', '.input-update .add', function(){
		var $this = $(this);
		if($this.hasClass('enable')){
			return;
		}

		var $ul = $this.closest('ul');
		var $_new = $ul.after('<ul id="1">' + $ul.html() + '</ul>');
		console.log($_new);
		// $_new.find('li').removeClass('input-error').end().find('input').val('');

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