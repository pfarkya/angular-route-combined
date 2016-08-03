
angular.module('crudNgApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/list', {
                templateUrl: 'listitem.html',
                controller: 'ListController',
            })
            .when('/add',{
                templateUrl:'additem.html',
                controller: 'AddController',
            })
    })
    .controller('mainController', ['$scope', '$http', function($scope, $http) {
        $scope.hello = "hello";
        $scope.keys = ["id", "name"];
        $scope.dataAdd = {};
        return $http({
            method: 'GET',
            url: 'http://localhost:8081/records?_start=0&_limit=1'
        }).then(function successCallback(response) {
                // $log.log("hahahhhahha respond" + JSON.stringify(response));
                if (response.data[0]) {
                    $scope.keys = Object.keys(response.data[0]);
                    $scope.keys.forEach(function(key) {
                        if (key != 'id') 
                            $scope.dataAdd[key] = "";
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
        $scope.id="";
        $scope.updateModal=function(record){
            $scope.dataUpdate=record;
            $scope.id=record.id;
        }
        $scope.update=function(){
            return $http({
            method: 'PUT',
            url: 'http://localhost:8081/records/'+$scope.id,
            data: $scope.dataUpdate,
            'content-type': "application/json",
        }).then(function successCallback(response) {
                $('#modalUpdate').modal('hide');
                alert("Successfully Updated");
            },
            function errorCallback(response) {
                alert("not get" + response.message);
            });
        }
        return $http({
            method: 'GET',
            url: 'http://localhost:8081/records?_start=0&_limit=20'
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
    .controller('AddController',['$scope','$http',function($scope,$http){
        $scope.addItem=function(){
               return $http({
                method: 'POST',
                url: 'http://localhost:8081/records',
                data: $scope.dataAdd,
                'content-type': "application/json",
            }).then(function successCallback(response){
                $scope.showMessage="Successfully Added";
            });
        }
    }])

