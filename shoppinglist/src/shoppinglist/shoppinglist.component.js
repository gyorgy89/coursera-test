(function () {
'use strict';

angular.module('ShoppingList')
.component('shoppingList', {
  templateUrl: "src/shoppinglist/shoppinglist.template.html",
  controller: ShoppingListComponentController,
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&',
  }
});

ShoppingListComponentController.$inject = ['$element', '$rootScope', '$q', 'WeightLossFilterService']
function ShoppingListComponentController($element, $rootScope, $q, WeightLossFilterService) {
  var $ctrl = this;
  var totalItems;

  $ctrl.remove = function(myIndex) {
     $ctrl.onRemove({index: myIndex});
  }

  $ctrl.$onInit = function () {
    totalItems = 0;
  }

  $ctrl.$doCheck = function () {
    if($ctrl.items.length !== totalItems) {
      //console.log("Number of Items changed. Checking for cokies...");
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
    }
  }
}



})();
