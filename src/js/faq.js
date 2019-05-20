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
    var $panelHead = null;
    var $faqPanelParent = null;
    $('#faq-panel-wrap').on('click','.panel-head',function() {
        $panelHead = $(this);
        $faqPanelParent = $panelHead.parent();
        if($faqPanelParent.hasClass("active")){
            $faqPanelParent.removeClass("active");
            $faqPanelParent.find('.panel-body').slideUp();
        }
        else{
            $faqPanelParent.addClass("active");
            $faqPanelParent.find('.panel-body').slideDown();
        }
    });
})();