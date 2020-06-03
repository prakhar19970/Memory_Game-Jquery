import {initializeStructure} from './memorygame.js';

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
      //  elem.target.classList.toggle('button-shake');
      $('.option-btn').attr('disabled',"true");
      $('#myAudio').append('<source src="Blop-Mark_DiAngelo-79054334.mp3" type="audio/mp3">').attr('autoplay',true);

      setTimeout(()=>{
        initializeStructure(elem.target.getAttribute('data-size'),elem.target.getAttribute('data-mode'),$(window).width())
        $('.option-btn').attr('disabled',"false");
      },2000);  
     })

   })
 