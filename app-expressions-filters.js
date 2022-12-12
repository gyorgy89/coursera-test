(function () {
'use strict';

angular.module('MsgApp',[])
.controller('MsgController', MsgController);

MsgController.$inject = ['$scope','$filter'];
function MsgController($scope,$filter) {
  $scope.name = "Gyuri";
  $scope.stateOfBeing = "hungry";
  $scope.cookieCost = 111;

  $scope.sayMessage = function() {
    var msg = "Almafaaaaaaaaa"
    var output = $filter('uppercase')(msg);
    return output;
  }

  $scope.feedYaakov = function () {
    $scope.stateOfBeing = "fat";
  }
}

})();
