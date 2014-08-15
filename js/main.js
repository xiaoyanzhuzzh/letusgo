$(document).ready(function() {

    showItemsList();

    if(localStorage.getItem('cartCount')){
        localStorage.setItem('cartCount',0);
    }

    $('.btn-sm').on('click',function() {

        var number = parseInt(localStorage.getItem('cartCount')) + 1;
        localStorage.setItem('cartCount',number);
        $('#itemsNumber').text(number);

    });
    cartItemList();
    payList();
});
//

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
    var categorys = [];

    var isExist = function(type){
        if(categorys.length === 0){

            return false;
        }
        else{
            for (var i = 0; i < categorys.length; i++){

                if (type == categorys[i]){
                    return true;
                }

            }
            return false;
        }
    };

    for (var i = 0; i < items.length; i++){
        if(!isExist(items[i].category)) {

            var text = '';
            text += '<div class="panel panel-default">';
            text += '<div class="panel-heading">'+ items[i].category +'</div>';
            text += '<div class="panel-body" id="'+ items[i].category +'" ><div class="row">';
            text += '<div id="class" class="col-md-4 form-group">'+ items[i].name +'</div>';
            text += '<div id="class" class="col-md-4 form-group">'+ items[i].price +'/'+ items[i].unit +'</div>';
            text += '<div id="class" class="col-md-4 form-group"><button type="button" id="'+ items[i].barcode +'"class="btn btn-primary btn-sm">加至购物车</button></div>';
            text += '</div></div></div>';
            $('#itemslist').append(text);
            categorys.push(items[i].category);
        }
        else{
            var text2 = '';
            text2 += '<div class="row">';
            text2 += '<div id="class" class="col-md-4 form-group">'+ items[i].name +'</div>';
            text2 += '<div id="class" class="col-md-4 form-group">'+ items[i].price +'/'+ items[i].unit +'</div>';
            text2 += '<div id="class" class="col-md-4 form-group"><button type="button" id="'+ items[i].barcode +'"class="btn btn-primary btn-sm">加至购物车</button></div>';
            text2 += '</div>';
            $('#' + items[i].category).append(text2);

        }
    }
}

function showCartList(){
    var items = JSON.parse(storageItem(loadAllItems()));
    var storageCartItems = [];
    $('.btn-sm').on('click',function(){
       // console.log($(this)[0].id);
        var barcode = $(this)[0].id;


        var isExistInCart = function(barcode){
            if(storageCartItems.length === 0){
                return false;
            }
            else{
                for(var i = 0; i < storageCartItems.length; i++){
                    if(barcode == storageCartItems[i].item.barcode){
                        return true;
                    }
                }
                return false;
            }

        };

        for (var i = 0; i < items.length; i++){
            var item = items[i];

            if(!isExistInCart(barcode) && barcode == item.barcode){
                var cartItem = new CartItem(item,1);
                storageCartItems.push(cartItem);
            }
            else{
               storageCartItems[i].number += 1;
            }

        }

    });
    return localStorage.setItem('cartList',JSON.stringify(storageCartItems));
}



function cartItemList() {


    var cartList = JSON.parse(showCartList());

    for(var i = 0; i < cartList.length; i++){
        var cartText = '';
        cartText += '<div class="panel panel-default">';
        cartText += '<div class="panel-heading">' + cartList[i].category +' </div>';
        cartText += '<div class="panel-body"><div class="row">';
        cartText += '<div id="class" class="col-md-2 form-group">' + cartList.item.name + '</div>';
        cartText += '<div id="class" class="col-md-2 form-group">' + cartList.item.price + '/' + cartList.item.unit +'</div>';
        cartText += '<div id="class" class="col-md-2 form-group">' + cartList.number + '</div>';
        cartText += '<div id="class" class="col-md-2 form-group">' + cartList.subtotal +'</div>';
        cartText += '<div id="class" class="col-md-4 form-group"><button><span class="glyphicon glyphicon-plus"></span></button>';
        cartText += '<input type="text"><button><span class="glyphicon glyphicon-minus"></span></button></div>';
        cartText += '</div></div></div>';
        $('#cartItems').append(cartText);

    }

}

function payList() {

    var cartList = JSON.parse(showCartList());
    var total = 0;
    var finalText = '<p>***没钱赚商品***</p><p>---------------------------------------</p>';
    for (var i = 0; i < cartList.length; i++){
        total += cartList[i].subtotal;
        finalText += '<p>名称：' + cartList[i].item.name + ',&nbsp;&nbsp;单价：' + cartList[i].item.price + '元/' + cartList[i].item.unit +
            ',&nbsp;&nbsp;数量：' + cartList[i].number + cartList[i].item.unit + ',&nbsp;&nbsp;小计：' + cartList[i].subtotal + '元</p>';

    }
    finalText += '<p>----------------------------------------</p><p>总计：' + total + '元</p>';

    $('#finalList').append(finalText);
}