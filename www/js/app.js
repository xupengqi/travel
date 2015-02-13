// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.factory('FlightDataService', function($q, $timeout) {
  var searchAirlines = function(searchFilter) {
    console.log('Searching airlines for ' + searchFilter);
    var deferred = $q.defer();
    var matches = airlines.filter( function(airline) {
      if(airline.City.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return true;
    });
    $timeout( function(){
       deferred.resolve( matches );
    }, 100);
    return deferred.promise;
  };
  return {
    searchAirlines : searchAirlines
  };
})
.controller('homepage', ['$scope', 'FlightDataService', function($scope, FlightDataService) {
  $scope.myTitle = 'Auto Complete Example';
    $scope.data = { "airlines" : [], "selected":[], "search" : '', 'footer':'' };
    $scope.searching = false;
    $scope.search = function() {
      if (!$scope.searching) {
        $scope.searching = true;
        var curQuery = $scope.data.search;
        FlightDataService.searchAirlines($scope.data.search).then(
          function(matches) {
            $scope.data.airlines = matches;
            $scope.searching = false;
            if (curQuery !== $scope.data.search) {
              $scope.search();
            }
            else {
              $scope.searching = false;
            }
          }
        );
      }
    };
    $scope.add = function() {
      if($scope.data.selected.indexOf(this.airline) >= 0) return;
      $scope.data.selected.push(this.airline);
      $scope.data.footer = $scope.data.selected.length + " cities selected";
    };
    $scope.remove = function() {
      $scope.data.selected.splice($scope.data.selected.indexOf(this.airline), 1);
      $scope.data.footer = $scope.data.selected.length + " cities selected";
    };
}]);
