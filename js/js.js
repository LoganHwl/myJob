

$(function(){
    $(window).scroll(function(){
        height = $(window).scrollTop();
        if(height > 400){
            $(".hdhead").css({"position":"fixed","height":"50px"});
            $(".hdhead .linkimg img").css({"opacity":"0.0"});
        }else{
            $(".hdhead").css({"position":"relative","height":"80px"});
            $(".hdhead .linkimg img").css({"opacity":"1.0"});
        };
    });
}); 


$(function(){
    $(window).scroll(function(){
        page_top = $(window).scrollTop();
		page_bottom = $(document).height() - $(window).height() - $(window).scrollTop();
        if(page_top > 400 && page_bottom > 50){
            $('.menunav').fadeIn(200);
        }else{
            $('.menunav').fadeOut(200);
        };
    });
}); 