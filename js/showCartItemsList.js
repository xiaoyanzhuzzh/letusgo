$(document).ready(function(){

    $('#itemsNumber').text(localStorage.getItem('cartCount'));
    loadCartItemList();

});

function loadCartItemList() {


    var countArray = JSON.parse(localStorage.getItem('cartItems'));
    var total = 0;
    for (var i = 0; i < countArray.length; i++) {
        total += countArray[i].number * countArray[i].item.price;
        var cartText = '';
        cartText += '<div class="panel panel-default">';
        cartText += '<div class="panel-heading">' + countArray[i].item.category + ' </div>';
        cartText += '<div class="panel-body"><div class="row">';
        cartText += '<div id="class" class="col-md-2 form-group">' + countArray[i].item.name + '</div>';
        cartText += '<div id="class" class="col-md-2 form-group">' + countArray[i].item.price + '/' + countArray[i].item.unit + '</div>';
        cartText += '<div id="class" class="col-md-2 form-group">' + countArray[i].number + '</div>';
        cartText += '<div id="class" class="col-md-2 form-group">' + countArray[i].number * countArray[i].item.price + '</div>';
        cartText += '<div id="class" class="col-md-4 form-group"><button><span class="glyphicon glyphicon-plus"></span></button>';
        cartText += '<input type="text" id="' + countArray[i].item.name + '"><button><span class="glyphicon glyphicon-minus"></span></button></div>';
        cartText += '</div></div></div>';
        $('#' + countArray[i].item.name).value = countArray[i].number;
        //console.log($('#' + countArray[i].item.name).text(countArray[i].number));
        $('#cartItems').append(cartText);

    }
    $('#total').text(total + '元');
}
