
$(document).ready(function() {
  $('#demo').click(function() {    
    animateScrollTo('#demo-service')
  })
})


function animateScrollTo(id) {
  $('html, body').animate({
      scrollTop: $(id).offset().top
  }, 800, 'swing');
}



