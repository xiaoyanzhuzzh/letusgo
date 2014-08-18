$(document).ready(function() {

    $('#itemsNumber').text(localStorage.getItem('cartCount'));
    payList();

});
function payList() {

    var countArray = JSON.parse(localStorage.getItem('cartItems'));
    if(!countArray) {
        countArray=[];
    }

    var total = 0;
    var totalNumber = 0;

    var timeText =Utils.formatter. formatDateTime(new Date()) ;
    $('#showTime').append(timeText);

    var finalText = '';
    if (countArray.length !== 0) {
        for (var i = 0; i < countArray.length; i++) {

            if(countArray[i].number  > 0) {
                totalNumber += countArray[i].number;
                total += countArray[i].number * countArray[i].item.price;

                finalText += '<div class="row">' +
                    '<div class="col-md-2 form-group">' + countArray[i].item.category + '</div>' +
                    '<div class="col-md-2 form-group">' + countArray[i].item.name + '</div>' +
                    '<div class="col-md-2 form-group">' + (countArray[i].item.price).toFixed(2) + '/' + countArray[i].item.unit + '</div>' +
                    '<div class="col-md-2 form-group">' + countArray[i].number + '</div>' +
                    '<div class="col-md-4 form-group">' + (countArray[i].number * countArray[i].item.price).toFixed(2) + '</div>' +
                    '</div>';
            }
            else{
                $('#no').text('虽后会有期，仍需珍惜今夕，回去看看吧，么么哒！')
            }
        }
        finalText +=
            '<div class="row"><div id="class" class="col-md-2"><h4>总数：' + totalNumber + '</h4></div></div>'+
            '<div class="row"><div id="class" class="col-md-2"><h4>总计：' + total.toFixed(2) + '(元)</h4></div></div>';
        $('#finalList').append(finalText);
    }
    else{
        $('#no').text('虽后会有期，仍需珍惜今夕，回去看看吧，么么哒！')
    }


}