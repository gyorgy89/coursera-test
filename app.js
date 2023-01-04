(function () {
'use strict';

angular.module('ShoppingListEventApp',[])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.service('WeightLossFilterService',WeightLossFilterService)
.component('shoppingList', {
  templateUrl: "shoppingList.html",
  controller: ShoppingListComponentController,
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&',
  }
})
.component('loadingSpinner',{
  templateUrl: 'spinner.html',
  controller: SpinnerController
});

SpinnerController.$inject = ['$rootScope']
function SpinnerController($rootScope) {
  var $ctrl = this;

  var cancelListener = $rootScope.$on('shoppinglist:processing', function(event, data) {
    if(data.on) {
      $ctrl.showSpinner = true;
    } else {
      $ctrl.showSpinner = false;
    }
  });

  $ctrl.$onDestroy = function() {
    cancelListener();
  }
}

ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService']
function ShoppingListComponentController($rootScope, $element, $q, WeightLossFilterService) {
  var $ctrl = this;
  var totalItems;

 $ctrl.remove = function(myIndex) {
     $ctrl.onRemove({index: myIndex});
  }

  $ctrl.$onInit = function () {
    totalItems = 0;
  }

  $ctrl.$onChanges = function(changeObject) {
    console.log("Changes: ", changeObject);
  }

  $ctrl.$doCheck = function () {
    if($ctrl.items.length !== totalItems) {
      
      totalItems = $ctrl.items.length;
      $rootScope.$broadcast('shoppinglist:processing',{on: true});
      var promises = [];
      for(var i = 0; i< $ctrl.items.length; i++) {
        promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
      }

      $q.all(promises)
      .then(function(result) {
        var warningElement = $element.find('div.error');
        warningElement.slideUp(900);
      })
      .catch(function (result) {
        var warningElement = $element.find('div.error');
        warningElement.slideDown(900);
      })
      .finally(function() {
        $rootScope.$broadcast('shoppinglist:processing',{on:false});
      });
    }
  }
}

WeightLossFilterService.$inject = ['$q']
function WeightLossFilterService( $q) {
  var service = this;

  service.checkName = function(name) {

    if(name.toLowerCase().indexOf("aa") !== -1) {
      return $q.reject('my-failure-reason');
    } else {
      return false;
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
