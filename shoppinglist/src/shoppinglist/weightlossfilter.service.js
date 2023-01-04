(function () {
'use strict';

angular.module('ShoppingList')
.service('WeightLossFilterService', WeightLossFilterService);

WeightLossFilterService.$inject = [];
function WeightLossFilterService() {
  var service = this;

  service.checkName = function() {
    for( var i = 0; i < ANYAD.length; i++) {
      var name = ANYAD[i].name;
      if(name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }
    
    return false;
  } 
}

})();
