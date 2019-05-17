// (function(){
//     $('#faq-panel-wrap').on('click','.panel-head',function() {
//         if($('#faq-panel-wrap .panel-body').hasClass("active")){
//             $('#faq-panel-wrap .panel-body').removeClass("active");
//         }
//         else{
//             $('#faq-panel-wrap .panel-body').addClass("active");
//         }
//     });
// })();
(function(){
    $('#faq-panel-wrap').on('click','.panel-head',function() {
        if($('#faq-panel-wrap .panel-body').hasClass("active")){
            $(this).next().removeClass("active");
            $(this).next().slideUp();
        }
        else{
            $(this).next().addClass("active");
            $(this).next().slideDown();
        }
    });
})();