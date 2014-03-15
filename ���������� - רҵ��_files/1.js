
var hash = getHash();
if(hash=='' || typeof(hash) == 'undefined') {
	hash = 'home';
}
$(function(){
	loading();
	// 加载初始页面
	changeContent(hash);
	// 按钮、刷新
	$('.menu a').each(function(){
		if ($(this).attr('href').split('#')[1] == hash)
		{
			$(this).addClass('hover').blur();
		}
	});
	$('.menu a').click(menuClick);
	$('.header .text a').focus(function(){$(this).blur();});


	$('.dcform input').click(function(){
		$('.dcform').html('<center><font color="green">非常感谢您的反馈！</font></center>').fadeOut(1200);
		$.post(contextPath + 'price-count', {price: $(this).val()});
	});

	// bom start
	setTimeout(function(){
		$('.bom').slideDown('fast');
		setInterval(function(){
			if ($('.bom').hasClass('bom_hover'))
			{
				$('.bom').removeClass('bom_hover');
			} else {
				$('.bom').addClass('bom_hover');
			}
		}, 200);
	}, 3000);
	$('.bom a').click(function(){$('.bom').hide()});
	// bom end
});

function menuClick(){
	loading();
	$('.menu a').removeClass('hover');
	$(this).addClass('hover').blur();
	var tag = $(this).attr('href').split('#')[1];
	changeContent(tag);
	window.scrollTo(0, 0);

	if (tag == 'home')
	{
		$('#gobackhome').hide();
	}

	if (tag == 'renew')
	{
		$('.header .text a').css({'visibility':'hidden'});
	} else {
		$('.header .text a').css({'visibility':'visible'});
	}
}

function changeContent(act) {
	$("#mainContent").load(contextPath + act);
}

function loading() {
	$("#mainContent").html('<div class="loading"><img src="img/load.gif" /></div>');
}

function getHash() {
	return window.location.hash.split('#')[1];
}
function redirect(data) {
	var argv = data.split('@@');
	if (argv[0] == 'relogin')
	{
		if (confirm('登录超时，是否请重新登录？'))
		{
			window.location.href = argv[1];
		} else {
			$('input[disabled]').removeAttr('disabled');
		}
		return true;
	}
	return false;
}
