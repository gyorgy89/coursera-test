(function () {
'use strict';

angular.module('ShoppingListDirectiveApp',[])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('shoppingList', ShoppingListDirective);

function ShoppingListDirective() {
  var ddo = {
    templateUrl: "shoppingList.html",
    scope: {
      items: '<',
      myTitle: '@title',
      onRemove: '&',
    },
    controller: ShoppingListDirectiveController,
    controllerAs: 'list',
    bindToController: true, 
    link: ShoppingListDirectiveLink,
    transclude: true
  }

  return ddo;

}

function ShoppingListDirectiveLink(scope, element, attrs, controller) {
  console.log("Link scope: " , scope);
  console.log("Controller instance is: " , controller);
  console.log("Element is: " , element);

  scope.$watch('list.cookiesInList()', function(newValue, oldValue) {
    console.log("Old value: ", oldValue);
    console.log("New value: ", newValue);

    if(newValue === true) {
      displayCookieWarning();
    } else {
      removeCookieWarning();
    }
  });

  function displayCookieWarning() {
    //UsingJQLITE
    //var warningElem = element.find("div");
    //console.log(warningElem);
    //warningElem.css('display', 'block');

    //If Jquey is included before Angular
    var warningElem = element.find("div.error");
    warningElem.slideDown(900);
  }

  function removeCookieWarning() {
    //UsingJQLITE
    //var warningElem = element.find("div");
    //warningElem.css('display', 'none');

     //If Jquey is included before Angular
    var warningElem = element.find("div.error");
    warningElem.slideUp(900);
  }

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
  list.warning = 'Cookies Detected!';

  list.addItem = function() {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items )";
  }

  list.removeItem = function(itemIndex) {
    shoppingList.removeItem(itemIndex);
    var removedItem = list.items[itemIndex].name
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
