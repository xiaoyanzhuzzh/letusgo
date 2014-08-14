$(document).ready(function(){

    if(!localStorage.getItem('cartCount')){
        localStorage.setItem('cartCount',0);
    }
    $('.btn-sm').on('click',function(){
       
        localStorage.cartCount = parseInt(localStorage.getItem('cartCount')) + 1;
        $('#itemsNumber').text(localStorage.cartCount);

    });





});