angular.module('datingApp').component('userProfile', {
    templateUrl: '/public/templates/profile.html',
    controller: function profileCtrl($scope, $stateParams, $location, oneUser) {
        $scope.user = $stateParams.user;
        console.log($scope.user, 'here')
        /*
        //non-SPA version of routing:
        var url = $location.$$absUrl;
        console.log(url);
        var lastElement = url.replace(/(.*)([\\\/][^\\\/]*$)/, "$2").slice(1);

        var entry = oneUser.get({ username: lastElement }, function(succ) {
            $scope.user = succ;
        });
        */

    }
})
