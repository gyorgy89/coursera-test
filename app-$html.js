(function () {
'use strict';

angular.module('MenuCategoriesApp',[])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant("ApiBasePath", "https://6e43bb07-04bc-4613-b3fe-5766b5565dc3.mock.pstmn.io");

MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService) {
  var menu = this;

  var promise = MenuCategoriesService.getMenuCategories();

  promise.then(function(response) {
    menu.categories = response.data;
  })
  .catch(function(error){
    console.log("Something went terribly wrong.");
  });

  menu.logMenuItems = function(shortName) {
    var promise = MenuCategoriesService.getMenuCategory(shortName);

    promise.then(function(response) {
     console.log(response.data);
    })
    .catch(function(error){
      console.log(error);
    });
  };
  

  /*list.addItem = function() {
    try {
      
      ShoppingListService.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }
  }

  list.removeItem = function(itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  }*/
}

MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;

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
  service.getMenuCategories = function() {
    var response = $http({  
      method: "GET",
      url: (ApiBasePath + "/menu-categories")
    })
   
    return response;
  }

  service.getMenuCategory = function(shortName) {
    var response = $http({  
      method: "GET",
      url: (ApiBasePath + "/menu-category"),
      params: {
        category: shortName
      }
    });
   
    return response;
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
