function CartItem(item, number) {

    this.item = item;
    this.number = number || 0;

}

CartItem.prototype.getItem = function() {
    return this.item = this.item;
};