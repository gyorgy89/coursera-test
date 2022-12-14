(function () {
'use strict';

angular.module('ShoppingListEventApp',[])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.service('WeightLossFilterService', WeightLossFilterService)
.component('shoppingList', {
  templateUrl: "shoppingList.html",
  controller: ShoppingListComponentController,
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&',
  }
})
.component('loadingSpinner', {
  templateUrl: 'spinner.html',
  controller: SpinnerController
});

SpinnerController.$inject = ['$rootScope'];
function SpinnerController($rootScope) {
  var $ctrl = this;

  var cancelListener = $rootScope.$on('shoppinglist:processing', function(event, data) {
    console.log("Event: ", event);
    console.log("Data: ", data);
    //console.log(data);
    if(data.on) {
      $ctrl.showSpinner = true;
    } else {
      $ctrl.showSpinner = false;
    }
  });

  $ctrl.$onDestroy = function () {
    cancelListener();
  }
}

ShoppingListComponentController.$inject = ['$element', '$rootScope', '$q', 'WeightLossFilterService']
function ShoppingListComponentController($element, $rootScope, $q, WeightLossFilterService) {
  var $ctrl = this;
  var totalItems;

  /*$ctrl.cookiesInList = function() {
    for( var i = 0; i < $ctrl.items.length; i++) {
      var name = $ctrl.items[i].name;
      if(name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }
    
    return false;
  }*/

  $ctrl.remove = function(myIndex) {
     $ctrl.onRemove({index: myIndex});
  }

  $ctrl.$onInit = function () {
    totalItems = 0;
  }

  $ctrl.$doCheck = function () {
    if($ctrl.items.length !== totalItems) {
      console.log("Number of Items changed. Checking for cokies...");
      totalItems = $ctrl.items.length;

      $rootScope.$broadcast('shoppinglist:processing', {on: true});
      var promises = [];
      for(var i = 0 ;i < $ctrl.items.length; i++) {
        promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
      }

      $q.all(promises) 
      .then(function (result) {
        //remove cookie warning
        var warningElement = $element.find('div.error');
        warningElement.slideUp(900);
      })
      .catch( function (result) {
        //show cookie warning
        var warningElement = $element.find('div.error');
         warningElement.slideDown(900);
      })
      .finally(function () {
        $rootScope.$broadcast('shoppinglist:processing',{on: false});
      });

      /*if ($ctrl.cookiesInList()) {
        //showwarning
         var warningElement = $element.find('div.error');
         warningElement.slideDown(900);
      } else {
        //Hidewarning
        var warningElement = $element.find('div.error');
         warningElement.slideUp(900);
      }*/
    }
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

function WeightLossFilterService() {
  var service = this;

  var items = [];

  service.checkName = function() {
    for( var i = 0; i < items.length; i++) {
      var name = items[i].name;
      if(name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }
    
    return false;
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
