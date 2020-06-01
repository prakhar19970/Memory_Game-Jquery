
    $(document).ready(()=>{
        $('#background-carousel-landscape').hide();
        $('#background-carousel-portrait').hide();
 
       console.log($(window).width());
       
       if($(window).width()>600)
       {
         $('#background-carousel-portrait').hide();
         $('#background-carousel-landscape').fadeIn();
       }
       else{
         $('#background-carousel-landscape').hide();
       $('#background-carousel-portrait').fadeIn();
       }
 
     $(window).on('resize', function() {
        if($(window).width() > 600) {
         $('#background-carousel-landscape').fadeIn();
         $('#background-carousel-portrait').fadeOut();
         }else{
         $('#background-carousel-landscape').fadeOut();
         $('#background-carousel-portrait').fadeIn();
         }
       })
 
     $('.option-btn').click((elem)=>{
       elem.target.classList.toggle('button-shake');     
     })
   })
 