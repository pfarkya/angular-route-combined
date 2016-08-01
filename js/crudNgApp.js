angular.module('crudNgApp', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/list', {
                templateUrl: 'listitem.html',
                controller: 'ListController',
            })
            // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(true);
    })
    .controller('mainController', ['$scope', function($scope) {
        $scope.hello = "hello";
    }])
    .controller('ListController', ['$scope', function($scope) {
        $scope.hello = "welcome";
        $scope.records = [];
        $http('', url, post, function(status, response) {
            // success
        }, function(status, response) {
            // error
        });
    }])
