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

    $('.inputItemNumber').on('blur',function(){
        console.log($(this)[0].id);
        changeInput( $(this)[0].id);
    });

    $('.trash').on('click',function(){
        var cartItem = $(this).closest('.row').find('.inputItemNumber')[0].id;

        deleteCartItem(cartItem);
    });
});

function loadCartItemList() {
    var countArray = JSON.parse(localStorage.getItem('cartItems'));

    if(!countArray){
        countArray= [];
    }
    var categorys = [];
    for (var i = 0; i < countArray.length; i++) {

       if (!categoryIsExist(countArray[i].item.category,categorys)){
           var cartText = '';
           cartText += '<div class="panel panel-default">'+
               '<div class="panel-heading">' + countArray[i].item.category + ' </div>'+
               '<div class="panel-body" id="'+countArray[i].item.category+'"><div class="row">'+
               '<div class="col-md-2 form-group">' + countArray[i].item.name + '</div>'+
               '<div class="col-md-2 form-group">' + (countArray[i].item.price).toFixed(2) + '/' + countArray[i].item.unit + '</div>'+
               '<div class="col-md-4 form-group"><button class="addButton"><span class="glyphicon glyphicon-plus"></span></button>'+
               '<input type="text" class="inputItemNumber" value='+countArray[i].number+' id="' + countArray[i].item.name + '">' +
               '<button class="reduceButton"><span class="glyphicon glyphicon-minus"></span></button></div>'+
               '<div class="col-md-2 form-group text-success">' + (countArray[i].number * countArray[i].item.price).toFixed(2) + '</div>'+
               '<div class="col-md-2 form-group"><button class="trash"><span class="glyphicon glyphicon-trash"></span></button></div>'+
               '</div></div></div>';
           categorys.push(countArray[i].item.category);
           console.log(categorys);
           $('#cartItems').append(cartText);
       }
        else{
           var cartText1 = '';
           cartText1 += '<div class="row">'+
               '<div class="col-md-2 form-group">' + countArray[i].item.name + '</div>'+
               '<div class="col-md-2 form-group">' + (countArray[i].item.price).toFixed(2) + '/' + countArray[i].item.unit + '</div>'+
               '<div class="col-md-4 form-group"><button class="addButton"><span class="glyphicon glyphicon-plus"></span></button>'+
               '<input type="text" class="inputItemNumber" value='+countArray[i].number+' id="' + countArray[i].item.name + '">' +
               '<button class="reduceButton"><span class="glyphicon glyphicon-minus"></span></button></div>'+
               '<div class="col-md-2 form-group text-success">' + (countArray[i].number * countArray[i].item.price).toFixed(2) + '</div>'+
               '<div class="col-md-2 form-group"><button class="trash"><span class="glyphicon glyphicon-trash"></span></button></div>'+
               '</div></div>';
           $('#'+ countArray[i].item.category).append(cartText1);
       }
    }
    $('#totalNumber').text(getTotalNumber(countArray));
    $('#total').text((getTotal(countArray)).toFixed(2) + '元');
}

function categoryIsExist(category, categorys){

    var existCategory;
    for (var i = 0; i < categorys.length; i++) {
        if (category === categorys[i]) {

            existCategory = categorys[i];
        }
    }
    return existCategory;
}

function addCurrentItemNumber(name){

     var countArray = JSON.parse(localStorage.getItem('cartItems'));

     if(!countArray){
         countArray= [];
     }

     for (var i = 0; i < countArray.length; i++){
         if(name === countArray[i].item.name) {

             countArray[i].number += 1;
             $('#' + name).val(countArray[i].number);
             var subtotal = (countArray[i].number * countArray[i].item.price).toFixed(2);
             $('#' + name).closest('.row').find('.text-success').text(subtotal);

             $('#totalNumber').text(getTotalNumber(countArray));
             $('#total').text((getTotal(countArray)).toFixed(2) + '元');

             localStorage.setItem('cartItems',JSON.stringify(countArray));

             $('#itemsNumber').text(getTotalNumber(countArray));
             localStorage.setItem('cartCount',getTotalNumber(countArray));

         }
     }
}

function reduceCurrentItemNumber(name){

    var countArray = JSON.parse(localStorage.getItem('cartItems'));
    if(!countArray){
        countArray= [];
    }

    for (var i = 0; i < countArray.length; i++){
        if(name === countArray[i].item.name){
            if (countArray[i].number > 1){
                countArray[i].number -= 1;
                $('#'+ name).val(countArray[i].number);

                var subtotal = (countArray[i].number * countArray[i].item.price).toFixed(2);
                $('#' + name).closest('.row').find('.text-success').text(subtotal);

                $('#totalNumber').text(getTotalNumber(countArray));
                $('#total').text((getTotal(countArray)).toFixed(2) + '元');

                localStorage.setItem('cartItems',JSON.stringify(countArray));

                $('#itemsNumber').text(getTotalNumber(countArray));
                localStorage.setItem('cartCount',getTotalNumber(countArray));
            }
            break;
        }
    }
}

function changeInput(id){

    var countArray = JSON.parse(localStorage.getItem('cartItems'));
    if(!countArray){
        countArray= [];
    }

    for (var i = 0; i < countArray.length; i++){

        if(id === countArray[i].item.name){
          countArray[i].number = parseInt($('#'+ id).val());

          var subtotal = (countArray[i].number * countArray[i].item.price).toFixed(2);
          $('#' + id).closest('.row').find('.text-success').text(subtotal);

          $('#totalNumber').text(getTotalNumber(countArray));
          $('#total').text((getTotal(countArray)).toFixed(2) + '元');

          localStorage.setItem('cartItems',JSON.stringify(countArray));

          $('#itemsNumber').text(getTotalNumber(countArray));
          localStorage.setItem('cartCount',getTotalNumber(countArray));
        }
    }
}

function deleteCartItem(item){

    var countArray = JSON.parse(localStorage.getItem('cartItems'));
    if(!countArray){
        countArray= [];
    }

    for(var i = 0; i < countArray.length; i++){
        if( item === countArray[i].item.name){
            countArray[i].number = 0;
            $('#' + item).val(0);
            var subtotal = (countArray[i].number * countArray[i].item.price).toFixed(2);
            $('#' + item).closest('.row').find('.text-success').text(subtotal);

            $('#totalNumber').text(getTotalNumber(countArray));
            $('#total').text((getTotal(countArray)).toFixed(2) + '元');

            localStorage.setItem('cartItems',JSON.stringify(countArray));

            $('#itemsNumber').text(getTotalNumber(countArray));
            localStorage.setItem('cartCount',getTotalNumber(countArray));

        }
    }
}

function getTotal(array){

    var total = 0;
    for(var i = 0; i < array.length; i++){
        total += array[i].number * array[i].item.price;
    }
    return total;
}

function getTotalNumber(array){

    var totalNumber = 0;
    for(var i = 0; i < array.length; i++){
        totalNumber += array[i].number;
    }
    return totalNumber;
}
