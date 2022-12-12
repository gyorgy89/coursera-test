(function () {
'use strict';

angular.module('ShoppingListApp',[])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('ShoppingListShowController', ShoppingListShowController)
.service('ShoppingListService', ShoppingListService)

ShoppingListAddController.$inject = ['ShoppingListService'];
function ShoppingListAddController(ShoppingListService) {
  var itemAdder = this;

  itemAdder.itemName = "";
  itemAdder.itemQuantity = "";

  itemAdder.addItem = function() {
    ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
  }
}

ShoppingListShowController.$inject = ['ShoppingListService'];
function ShoppingListShowController(ShoppingListService) {
  var showList = this;

  showList.items = ShoppingListService.getItems();

  showList.removeItem = function(itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  }
}

function ShoppingListService() {
  var service = this;

  var items = [];

  service.removeItem = function(itemIndex) {
    items.splice(itemIndex, 1);
  }

  service.addItem = function(itemName, itemQuantity) {
    var item = {
      name: itemName,
      quantity: itemQuantity
    };

    items.push(item);
  }

  service.getItems = function () {
    return items;
  }

}

})();
