$(function(){
	//add
	$('.fw-cal-par').on('touchend', '.fa-plus-square-o', function(){
		var $this = $(this),
			$parLi = $this.closest('li');

		var liHtml = '<li class="cf">' + $parLi.html().replace('fa-plus', 'fa-minus') + '</li>';
		$parLi.after(liHtml);

	})

	$('.fw-cal-par').on('touchend', '.fa-minus-square-o', function(){
		var $this = $(this),
			$parLi = $this.closest('li');

		$parLi.remove();

	})

})