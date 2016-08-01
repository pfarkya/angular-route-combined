angular.module('crudNgApp', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/list', {
                templateUrl: 'listitem.html',
                controller: 'ListController',
            })
            //     // configure html5 to get links working on jsfiddle
            // $locationProvider.html5Mode(true);

    })
    .controller('mainController', ['$scope', '$http', function($scope, $http) {
        $scope.hello = "hello";
        $scope.keys = ["id", "name"];
        $scope.dataAdd = {};
        return $http({
            method: 'GET',
            url: 'http://localhost:8080/records?_start=0&_limit=1'
        }).then(function successCallback(response) {
                // $log.log("hahahhhahha respond" + JSON.stringify(response));
                if (response.data[0]) {
                    $scope.keys = Object.keys(response.data[0]);
                    $scope.keys.forEach(function(key) {
                        if (key !== 'id') $scope.dataAdd[key] = "";
                    });
                } else {
                    alert("not record found");
                }
            },
            function errorCallback(response) {
                alert("not get" + response.message);
            });
    }])
    .controller('ListController', ['$scope', '$http', function($scope, $http) {
        $scope.hello = "welcome";
        $scope.records = [];
        return $http({
            method: 'GET',
            url: 'http://localhost:8080/records?_start=0&_limit=20'
        }).then(function successCallback(response) {
                // $log.log("hahahhhahha respond" + JSON.stringify(response));
                if (response.data[0]) {
                    $scope.records = response.data;
                } else {
                    alert("not record found");
                }
            },
            function errorCallback(response) {
                alert("not get" + response.message);
            });
    }])
