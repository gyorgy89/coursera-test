(function () {
'use strict';

angular.module('MsgApp',[])
.controller('MsgController', MsgController)
.filter('loves', LovesFilterFactory)
.filter('truth', TruthFilterFactory);

MsgController.$inject = ['$scope','$filter','lovesFilter'];
function MsgController($scope,$filter, lovesFilter) {
  $scope.name = "Gyuri";
  $scope.stateOfBeing = "hungry";
  $scope.cookieCost = 111;

  $scope.sayMessage = function() {
    var msg = "Bimbiska likes cookies."
    var output = $filter('uppercase')(msg);
    return output;
  }

  $scope.sayLoves = function() {
    var msg = "Bimbiska likes cookies.";
    var output = lovesFilter(msg);
    //var output = $filter('uppercase')(msg);
    return output;
  }

  $scope.feedYaakov = function () {
    $scope.stateOfBeing = "fat";
  }
}

function LovesFilterFactory() {
    return function (input) {
        input = input || "";
        input = input.replace("likes", "loves");
        return input
    }
}

function TruthFilterFactory() {
  return function (input, target, replace) {
        input = input || "";
        input = input.replace(target, replace);
        return input;
  }
}

})();
