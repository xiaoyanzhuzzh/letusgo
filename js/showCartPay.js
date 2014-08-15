$(document).ready(function() {

    $('#itemsNumber').text(localStorage.getItem('cartCount'));
    payList();

});
function payList() {

    var countArray = JSON.parse(localStorage.getItem('cartItems'));


    var total = 0;
    var finalText = '<p>***没钱赚商品***</p><p>---------------------------------------</p>';
    for (var i = 0; i < countArray.length; i++){
        total += countArray[i].number * countArray[i].item.price;
        finalText += '<p>名称：' + countArray[i].item.name + ',&nbsp;&nbsp;单价：' + countArray[i].item.price + '元/' + countArray[i].item.unit +
            ',&nbsp;&nbsp;数量：' + countArray[i].number + countArray[i].item.unit + ',&nbsp;&nbsp;小计：' + countArray[i].subtotal + '元</p>';

    }
    finalText += '<p>----------------------------------------</p><p>总计：' + total + '元</p>';

    $('#finalList').append(finalText);
}