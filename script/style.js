var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


document.addEventListener("DOMContentLoaded", function(){
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      document.getElementById('navbar_top').classList.add('fixed-top','bg-white','p-3','shadow-sm','animate__animated', 'animate__slideInDown');
      document.getElementById('navbar_top').classList.remove('pt-5');

      // add padding top to show content behind navbar
      navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.getElementById('navbar_top').classList.remove('fixed-top');
      document.getElementById('navbar_top').classList.remove('shadow-sm');
       // remove padding top from body
      document.body.style.paddingTop = '0';
    } 
});
}); 
