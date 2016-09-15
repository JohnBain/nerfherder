var app = angular.module('datingApp');

app.controller('loginModal', ['$scope', 'close', function($scope, close) {

    $scope.close = function(result) {
    	console.log($scope);
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

}]);
