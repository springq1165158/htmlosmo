(function(){
    $('#slideshow .slide-show-wrap .item-slide').hide();
    var $firstSlideItem = $('#slideshow .slide-show-wrap .slide-item-wrap > div:first');
    var $lastSlideItem = $('#slideshow .slide-show-wrap .slide-item-wrap > div:last');
    $firstSlideItem.addClass('active');
    var $currentSlideItem = null;
    var $currentSlideDot = null;
    var $prevSlideItem = $('#slideshow .slide-show-wrap .prev-button');
    var $nextSlideItem = $('#slideshow .slide-show-wrap .next-button');
    var $indexItem=1;
    var $CountSlideItem = $('#slideshow .slide-show-wrap .item-slide').length + 1;
    for($indexItem; $indexItem < $CountSlideItem; $indexItem++){
        $('#slideshow .slide-show-wrap .pagination-slide').append('<div class="slide-dot">'+$indexItem+'</div>');
    }
    var $firstDot = $('#slideshow .slide-show-wrap .slide-dot:first');
    var $lastDot = $('#slideshow .slide-show-wrap .slide-dot:last');
    $firstDot.addClass('changedotbg');

    $nextSlideItem.on('click',function(){
            $currentSlideItem = $('#slideshow .slide-show-wrap .item-slide.active')
            $currentSlideDot = $('#slideshow .slide-show-wrap .slide-dot.changedotbg')
            if($currentSlideItem.is($lastSlideItem)){
                $currentSlideItem.removeClass('active')
                $currentSlideItem = $firstSlideItem.addClass('active')
                $currentSlideDot.removeClass('changedotbg')
                $currentSlideDot = $firstDot.addClass('changedotbg')
            }
            else{
                $currentSlideItem.removeClass('active')
                $currentSlideItem.next().addClass('active')
                $currentSlideDot.removeClass('changedotbg')
                $currentSlideDot.next().addClass('changedotbg')
            }
        }
    )
    $prevSlideItem.on('click',function(){
            $currentSlideItem = $('#slideshow .slide-show-wrap .item-slide.active')
            $currentSlideDot = $('#slideshow .slide-show-wrap .slide-dot.changedotbg')
            if($currentSlideItem.is($firstSlideItem)){
                $currentSlideItem.removeClass('active')
                $currentSlideItem = $lastSlideItem.addClass('active')
                $currentSlideDot.removeClass('changedotbg')
                $currentSlideDot = $lastDot.addClass('changedotbg')
            }
            else{
                $currentSlideItem.removeClass('active')
                $currentSlideItem.prev().addClass('active')
                $currentSlideDot.removeClass('changedotbg')
                $currentSlideDot.prev().addClass('changedotbg')
            }
        }
    )
})()