function CartItem(item, number) {

    this.item = item;
    this.number = number || 0;
    this.subtotal = 0;

}

CartItem.prototype.getItem = function() {
    return this.item = this.item;
};

CartItem.prototype.getNumber = function() {
    return this.number = this.number;
};

CartItem.prototype.getSubtotal = function() {
    return this.subtotal  = this.item.price * this.number;
};
