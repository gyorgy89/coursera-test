(function () {
'use strict';

angular.module('ShoppingListDirectiveApp',[])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
.directive('shoppingList', ShoppingListDirective);

function ShoppingListDirective() {
  var ddo = {
    templateUrl: "shoppingList.html",
    scope: {
      items: '<',
      title: '@'
    },
    controller: 'ShoppingListDirectiveController as list',
    //controller: ShoppingListDirectiveController,
    //controllerAs: 'list',
    bindToController: true
  }

  return ddo;

}

function ShoppingListDirectiveController() {
  var list = this;
  
  list.cookiesInList = function() {
    for( var i = 0; i < list.items.length; i++) { 
      var name = list.items[i].name;
      if(name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }
    return false;
  }
}

ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list = this;
  var shoppingList = ShoppingListFactory();
  list.items = shoppingList.getItems();
  var origTitle = 'Shopping List #1';
  list.title = origTitle + " (" + list.items.length + " items )";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function() {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items )";
  }

  list.removeItem = function(itemIndex) {
    shoppingList.removeItem(itemIndex);
    list.title = origTitle + " (" + list.items.length + " items )";
  }
}

ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {
  var list = this;
  var shoppingList = ShoppingListFactory(3);
  list.items = shoppingList.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function() {
    try {
      shoppingList.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }
  }

  list.removeItem = function(itemIndex) {
    shoppingList.removeItem(itemIndex);
  }
}

function ShoppingListService(maxItems) {
  var service = this;

  var items = [];

  service.removeItem = function(itemIndex) {
    items.splice(itemIndex, 1);
  }

  service.addItem = function(itemName, itemQuantity) {
    if((maxItems === undefined) || ((maxItems !== undefined) && (items.length < maxItems))) {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };

      items.push(item);
    } else {
      throw new Error("Max Items (" + maxItems + ") reached.");
    }
  }

  service.getItems = function () {
    return items;
  }
}

function ShoppingListFactory() {
  var factory = function( maxItems) {
    return new ShoppingListService(maxItems);
  }

  return factory;
}

})();
