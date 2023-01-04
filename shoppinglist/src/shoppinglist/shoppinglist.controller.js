(function () {
'use strict';

angular.module('ShoppingList')
.controller('ShoppingListController', ShoppingListController);

ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list = this;
  var shoppingList = ShoppingListFactory();
  list.items = shoppingList.getItems();
  var origTitle = 'Shopping List #1';
  list.title = origTitle + " (" + list.items.length + " items )";

  list.itemName = "";
  list.itemQuantity = "";
  list.warning = 'Cookies Detected!';

  list.addItem = function() {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items )";
  }

  list.removeItem = function(itemIndex) {
    var removedItem = list.items[itemIndex].name;
    shoppingList.removeItem(itemIndex);
    list.lastRemoveItem = removedItem;
    list.title = origTitle + " (" + list.items.length + " items )";
  }
}

})();
