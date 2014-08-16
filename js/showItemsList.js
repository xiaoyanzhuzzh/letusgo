$(document).ready(function() {

    showItemsList();

    if(!localStorage.getItem('cartCount')){

        $('#itemsNumber').text(  localStorage.setItem('cartCount',0));
    }

    $('.btn-sm').on('click',function() {

        getCartList($(this)[0].id);

        var number = parseInt(localStorage.getItem('cartCount')) + 1;
        localStorage.setItem('cartCount',number);
        $('#itemsNumber').text(number);

    });
});


function loadAllItems() {
    return [
        new Item('ITEM000000', '可口可乐', '瓶', 3.00, '饮品'),
        new Item('ITEM000001', '雪碧', '瓶', 3.00, '饮品'),
        new Item('ITEM000002', '苹果', '斤', 5.50, '水果'),
        new Item('ITEM000003', '荔枝', '斤', 15.00, '水果'),
        new Item('ITEM000004', '电池', '个', 2.00, '生活用品'),
        new Item('ITEM000005', '方便面', '袋', 4.50, '零食')
    ];
}
//

function storageItem(items){

    if(localStorage.getItem('item')){
        localStorage.setItem('item','');
    }

    localStorage.item = JSON.stringify(items);
    return localStorage.item;
}
//

function showItemsList() {

    var items = JSON.parse(storageItem(loadAllItems()));

    for (var i = 0; i < items.length; i++){

            var text = '';
            text += '<div class="panel panel-default"><div class="panel-body">' +
                '<div class="row"><div id="class" class="col-md-3 form-group">'+ items[i].category +'</div>' +
                '<div id="class" class="col-md-3 form-group">'+ items[i].name +'</div>' +
                '<div id="class" class="col-md-3 form-group">'+ (items[i].price).toFixed(2)+'/'+ items[i].unit +'</div>' +
                '<div id="class" class="col-md-3 form-group">' +
                '<button type="button" id="'+ items[i].barcode +'"class="btn btn-primary btn-sm">加至购物车</button></div>' +
                '</div></div></div>';
            $('#itemslist').append(text);


    }
}
function getCartList(id) {

    var cartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (cartItems == null) {
        cartItems = [];
    }
    var cartItem = isExistInCart(id, cartItems);
    if (cartItem) {
        cartItem.number += 1;
    }
    else{
        cartItems.push(new  CartItem(getCartItems(id),1));
    }

    localStorage.setItem('cartItems',JSON.stringify(cartItems));

}

function getCartItems(id){
    var item;
    var items = JSON.parse(localStorage.getItem('item'));
    for (var i = 0; i < items.length; i++) {
        if(id === items[i].barcode){
            item = items[i];
        }
    }
    return item;
}

function isExistInCart(barcode, cartItems){

    var item;
    for (var i = 0; i < cartItems.length; i++){

        if (barcode === cartItems[i].item.barcode){
            item = cartItems[i];
        }
    }
    return item;
}

