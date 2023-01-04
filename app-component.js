(function () {
'use strict';

angular.module('ShoppingListComponentApp',[])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.component('shoppingList', {
  templateUrl: "shoppingList.html",
  controller: ShoppingListComponentController,
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&',
  }
});

ShoppingListComponentController.$inject = ['$scope','$element']
function ShoppingListComponentController($scope,$element) {
  var $ctrl = this;
  
  $ctrl.cookiesInList = function() {
    for( var i = 0; i < $ctrl.items.length; i++) {
      var name = $ctrl.items[i].name;
      if(name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }
    
    return false;
  }

  $ctrl.remove = function(myIndex) {
     $ctrl.onRemove({index: myIndex});
  }

  $ctrl.$onInit = function () {
    console.log("We are ib $onInit();");
  }

  $ctrl.$onChanges = function(changeObject) {
    console.log(changeObject);
  }

  $ctrl.$postLink = function () {
    $scope.$watch('$ctrl.cookiesInList()', function (newValue, oldValue) {
      console.log($element);
      if (newValue === true) {
        //showwarning
         var warningElement = $element.find('div.error');
         warningElement.slideDown(900);
      } else {
        //Hidewarning
        var warningElement = $element.find('div.error');
         warningElement.slideUp(900);
      }
    })
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
