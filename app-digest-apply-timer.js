(function () {
'use strict';

angular.module('CounterApp',[])
.controller('CounterController', CounterController)

CounterController.$inject = ['$scope','$timeout'];
function CounterController($scope, $timeout) {

  $scope.onceCounter = 0;
  $scope.counter = 0;
  $scope.name = "Alma";

  $scope.showNumberOfWatchers = function () {
    console.log("# of Watchers",$scope.$$watchersCount);
  }

  $scope.countOnce = function () {
    $scope.onceCounter = 1;
  };

  $scope.upCounter = function() {
    $timeout(function () {
      $scope.counter++;
      console.log("Counter incremented!");
    },2000)
  };

  // $scope.upCounter = function() {
  //   setTimeout(function () {
  //     $scope.$apply(function () {
  //       $scope.counter++;
  //       console.log("Counter incremented!");
  //     });
  //   }, 2000);
  // };

  // $scope.upCounter = function() {
  //   setTimeout(function () {
  //     $scope.counter++;
  //     console.log("Counter incremented!");
  //     $scope.$digest();
  //   }, 2000);
  // };

  //fired minimum twice
  $scope.$watch(function () {
    console.log("Digest loop fired");
  });

  //Manual Watch
  // $scope.$watch('onceCounter', function(newValue, oldValue){
  //   console.log("onceCounter old valiue", oldValue);
  //   console.log("onceCounter new valiue", newValue);
  // });
  //
  // $scope.$watch('counter', function(newValue, oldValue){
  //   console.log("counter old valiue", oldValue);
  //   console.log("counter new valiue", newValue);
  // });
}

})();
