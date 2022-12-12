(function () {
'use strict';

angular.module('ShoppingListPromiseApp',[])
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.service('WeightLossFilterService', WeightLossFilterService);

Config.$inject = ['ShoppingListServiceProvider'];
function Config(ShoppingListServiceProvider) {
  //Change default fromconfig
  ShoppingListServiceProvider.defaults.maxItems = 2;
}

ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
  var list = this;

  list.items = ShoppingListService.getItems();
  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function() {
    try {
      
      ShoppingListService.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }
  }

  list.removeItem = function(itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  }
}

ShoppingListService.$inject = ['$q','WeightLossFilterService']
function ShoppingListService($q, WeightLossFilterService ) {
  var service = this;

  var items = [];

  /*service.addItem = function(itemName, itemQuantity) {
    var promise = WeightLossFilterService.checkName(itemName);

    promise.then(function() {
      var nextPromise = WeightLossFilterService.checkQuantity(itemQuantity);

      nextPromise.then(function() {
        var item = {
          name: itemName,
          quantity: itemQuantity
        }
        items.push(item);
      }, function(errorResponse) {
        console.log(errorResponse.message);
      })
    }, function(errorResponse) {
      console.log(errorResponse.message);
    });
  };*/

  //not called parallel
  /*service.addItem = function(itemName, itemQuantity) {
    var promise = WeightLossFilterService.checkName(itemName);

    promise.then(function(response) {
      return WeightLossFilterService.checkQuantity(itemQuantity);
    })
    .then(function() {
      var item = {
        name: itemName,
        quantity: itemQuantity
      }
      items.push(item);
    })
    .catch (function (errorResponse) {
      console.log(errorResponse.message);
    });
  };*/

  //Parallel :-)
  service.addItem = function(itemName, itemQuantity) {
    var namePromise = WeightLossFilterService.checkName(itemName);
    var quantityPromise = WeightLossFilterService.checkQuantity(itemQuantity);
    
    $q.all([namePromise,quantityPromise])
    .then(function() {
      var item = {
        name: itemName,
        quantity: itemQuantity
      }
      items.push(item);
    })
    .catch (function (errorResponse) {
      console.log(errorResponse.message);
    });
  };

  service.removeItem = function(itemIndex) {
    items.splice(itemIndex, 1);
  }

  service.getItems = function () {
    return items;
  }
}


WeightLossFilterService.$inject = ['$q','$timeout'];
function WeightLossFilterService($q,$timeout) {
  var service = this;

  service.checkName = function(name) {
    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function() {
      if(name.toLowerCase().indexOf('cookie') === -1) {
        deferred.resolve(result);
      } else {
        result.message = "Stay away from cookies, Gyuri!";
        deferred.reject(result);
      }
    },3000);

    return deferred.promise;
  }

  service.checkQuantity = function(quantity) {
    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function() {
      if(quantity < 6) {
        deferred.resolve(result);
      } else {
        result.message = "That's too much, Gyuri!";
        deferred.reject(result);
      }
    },1000);

    return deferred.promise;
  }
};

})();
