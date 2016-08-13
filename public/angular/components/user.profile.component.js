angular.module('datingApp').component('userProfile', {
        templateUrl: '/public/templates/profile.html',
        controller: function profileCtrl($scope, $location, oneUser) {

            //less "Angular" than ngRoute, but this isn't an SPA and I was curious about $location & $resource

            var url = $location.$$absUrl;
            console.log(url);
            var lastElement = url.replace(/(.*)([\\\/][^\\\/]*$)/, "$2").slice(1);

            var entry = oneUser.get({ username: lastElement }, function(succ) {
                $scope.user = succ;
            });

        }
    })