(function () {
'use strict';

angular.module('BindingApp',[])
.controller('BindingController', BindingController)

BindingController.$inject = ['$scope'];
function BindingController($scope) {

  $scope.firstName = "Gyuri";
  //$scope.fullName = "";

  $scope.showNumberOfWatchers = function () {
    console.log("# of Watchers",$scope.$$watchersCount);
  }

  $scope.setFullName = function () {
    $scope.fullName = $scope.firstName + " " + "Sipos";
  }

  $scope.logFirstName = function () {
    console.log("firstName is: " , $scope.firstName);
  }

  $scope.logFullName = function () {
    console.log("Full name is: ",$scope.fullName);
  }
}

})();
