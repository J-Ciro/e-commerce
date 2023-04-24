const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})



document.addEventListener("DOMContentLoaded", function(){
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      document.getElementById('navbar_top').classList.remove('pt-3');
      document.getElementById('navbar_top').classList.add('fixed-top','bg-white','p-2','shadow-sm','animate__animated', 'animate__slideInDown');
      
      // add padding top to show content behind navbar
      let navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.getElementById('navbar_top').classList.remove('fixed-top');
      document.getElementById('navbar_top').classList.remove('shadow-sm');
      // remove padding top from body
     
      document.body.style.paddingTop = '0';
    } 


    
});
}); 
