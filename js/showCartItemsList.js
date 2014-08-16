$(document).ready(function(){

    $('#itemsNumber').text(localStorage.getItem('cartCount'));

    loadCartItemList();

    $('.addButton').on('click',function(){
       var name = $(this).closest('.row').find('.inputItemNumber')[0].id;
        addCurrentItemNumber(name);
    });
    $('.reduceButton').on('click',function(){

        var name = $(this).closest('.row').find('.inputItemNumber')[0].id;

        reduceCurrentItemNumber(name);
    });

});

function loadCartItemList() {
    var countArray = JSON.parse(localStorage.getItem('cartItems'));

    if(!countArray){
        countArray= [];
    }
    console.log(countArray);
    var totalNumber = 0;
    var total = 0;
    for (var i = 0; i < countArray.length; i++) {
        totalNumber += countArray[i].number;
        total += countArray[i].number * countArray[i].item.price;

        var cartText = '';
        cartText += '<div class="panel panel-default">'+
        '<div class="panel-heading">' + countArray[i].item.category + ' </div>'+
        '<div class="panel-body"><div class="row">'+
        '<div class="col-md-2 form-group">' + countArray[i].item.name + '</div>'+
        '<div class="col-md-2 form-group">' + (countArray[i].item.price).toFixed(2) + '/' + countArray[i].item.unit + '</div>'+
        '<div class="col-md-4 form-group"><button class="addButton"><span class="glyphicon glyphicon-plus"></span></button>'+
        '<input type="text" class="inputItemNumber" value='+countArray[i].number+' id="' + countArray[i].item.name + '">' +
        '<button class="reduceButton"><span class="glyphicon glyphicon-minus"></span></button></div>'+
        '<div class="col-md-2 form-group">' + (countArray[i].number * countArray[i].item.price).toFixed(2) + '</div>'+
        '<div class="col-md-2 form-group"><button><span class="glyphicon glyphicon-trash"></span></button></div>'+
        '</div></div></div>';

        $('#cartItems').append(cartText);

    }
    $('#totalNumber').text(totalNumber);
    $('#total').text(total.toFixed(2) + '元');
}
function addCurrentItemNumber(name){

     //console.log(name+'--------------------');

     var countArray = JSON.parse(localStorage.getItem('cartItems'));
         console.log(localStorage.getItem('cartItems')+'-------------');
     if(!countArray){
         countArray= [];
     }
   // console.log(countArray);
     for (var i = 0; i < countArray.length; i++){
         if(name === countArray[i].item.name){

             countArray[i].number += 1;
             $('#'+name).val(countArray[i].number);

         }
     }
    localStorage.setItem('cartItems',JSON.stringify(countArray));
}

function reduceCurrentItemNumber(name){
    console.log(name+'**************');
    var countArray = JSON.parse(localStorage.getItem('cartItems'));
    if(!countArray){
        countArray= [];
    }
    for (var i = 0; i < countArray.length; i++){
        if(name === countArray[i].item.name){
            if (countArray[i].number > 1){
                countArray[i].number -= 1;
                $('#'+name).val(countArray[i].number);

            }
            break;
        }
    }
    localStorage.setItem('cartItems',JSON.stringify(countArray));
}