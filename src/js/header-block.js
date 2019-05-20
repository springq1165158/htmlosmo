(function(){
    var $bodywrapper = $('#body-wrapper');
    var $menuBtn = $('#header .nav-mobile .menu-button');
    var $menuWrap = $('#header .menu-wrap');
    var $body = $('body');
    $menuBtn.on('click',function(){
        if ($menuBtn.hasClass('on')){
            $menuBtn.removeClass('on');
            $bodywrapper.removeClass('expand');
            $menuWrap.removeClass('visible1');
            $body.removeClass('overflow');
        }
        else{
            $menuBtn.addClass('on');
            $bodywrapper.addClass('expand');
            $menuWrap.addClass('visible1');
            $body.addClass('overflow');
        }
    })
})()