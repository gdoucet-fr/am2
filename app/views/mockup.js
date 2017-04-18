/**
 * Created by Gabriel on 05/04/2017.
 */

var _ = require('lodash');

angular.module('am2App')
  .controller('mockupController', ['$scope', 'calc', 'planeService', 'linesService', function ($scope, calc, planeService, lineService) {
    $scope.selects    = {};
    $scope.manualLine = {};
    $scope.results    = {};

    $scope.$watch('selects.selectedLine', function (line) {
      if (!_.isNil(line)) {
        lineService.getSimilarLines(line).then(function (data) {
          $scope.results.similarLines = data;
        });
        calc.getOptiPlanes(line).then(function (data) {
          $scope.results.optiPlanes = data;
        });
      }
    }, true);

    $scope.chooseLine = function (line) {
      $scope.selects.selectedLine = line;
      return false;
    };

    $scope.choosePlane = function (plane) {
      $scope.selects.selectedPlane = plane;
      return false;
    };

    lineService.getLines().then(function (res) {
      $scope.selects.lineChoices = res.data;
    });

    planeService.getPlanes().then(function (res) {
      $scope.selects.planeChoices = res.data;
    });

    $scope.getPlaneIcon = function (plane) {
      if (calc.isOptimised(plane, $scope.selects.selectedLine)) {
        return 'done';
      } else {
        return '';
      }
    };

    $scope.getAllOptis = function () {
      console.log($scope.manualLine);
      var lala = calc.getAllOptis($scope.manualLine);
      console.log(lala);
      $scope.results.optis = lala;
      console.log($scope.results.optis);
    };
  }]);