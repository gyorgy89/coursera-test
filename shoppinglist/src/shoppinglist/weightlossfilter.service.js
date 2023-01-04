(function () {
'use strict';

angular.module('ShoppingList')
.service('WeightLossFilterService', WeightLossFilterService);


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

})();
