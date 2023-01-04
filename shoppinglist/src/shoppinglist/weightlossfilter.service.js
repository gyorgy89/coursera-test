(function () {
'use strict';

angular.module('ShoppingList')
.service('WeightLossFilterService', WeightLossFilterService);

WeightLossFilterService.$inject = ['$q','$timeout']
function WeightLossFilterService($q, $timeout) {
  var service = this;

  var items = [];

  service.checkName = function(name) {
    var deferred = $q.defer();
    
    //Timeout just to simulate the time it could take (e.g. 5sec)
    $timeout(function() {
      if(name.toLowerCase().indexOf("aa") !== -1) {
        deferred.reject({status: 'error'});
      }
      else {
        deferred.resolve(false);
      }
    }, 1000);
    
    return deferred.promise;
  }  
}

})();
