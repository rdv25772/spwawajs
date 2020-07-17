(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunchItems = "";
    $scope.NumberOfLunchItems = 0;
    $scope.message = "";

    $scope.Check2Much = function () {
      var totalLunchValue = SplitLunchItems($scope.lunchItems);
      $scope.NumberOfLunchItems = totalLunchValue;

      if (totalLunchValue == 0 || $scope.lunchItems === "") {
        $scope.message = "Please enter data first";
      } else if (totalLunchValue <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too Much!";
      }

    };
  }

  function SplitLunchItems(string) {
    var arrayOfLunches = string.split(",");
    var lunchCount = arrayOfLunches.length;

    return lunchCount;
  };

})();
