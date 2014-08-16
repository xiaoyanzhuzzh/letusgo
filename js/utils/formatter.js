var Utils = Utils || {};

Utils.formatter = {

    formatDateTime: function (inputDate) {

        var year = this.dateDigitToString(inputDate.getFullYear()),
            month = this.dateDigitToString(inputDate.getMonth() + 1),
            date = this.dateDigitToString(inputDate.getDate()),
            hour = this.dateDigitToString(inputDate.getHours()),
            minute = this.dateDigitToString(inputDate.getMinutes()),
            second = this.dateDigitToString(inputDate.getSeconds());

        return year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    },
    dateDigitToString: function (num) {
        return num < 10 ? '0' + num : num;
    }
};
