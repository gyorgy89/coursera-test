(function () {
'use strict';

angular.module('NameCalculator',[])

.controller('NameCalculatorController', function ($scope) {
  $scope.name = "";
  $scope.totalValue = 0;

  $scope.displayNumeric = function () {
    var totalValue = 0;
    totalValue = $scope.calculateNumeric($scope.name);
    $scope.totalValue = totalValue;
  };

  $scope.calculateNumeric = function (string) {
    var totalStringValue = 0;
    for (var i = 0; i < string.length; i++) {
      totalStringValue += string.charCodeAt(i);
    }

    return totalStringValue;
  }
})

})()
