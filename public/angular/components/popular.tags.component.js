angular.module('datingApp').component('popularTags', {
    templateUrl: '/public/templates/populartags.html',

    controller: function populateTags($scope, authentication, tagService) {
        //*******authentication buttons******
        $scope.isLoggedIn = authentication.isLoggedIn();
        $scope.currentUser = authentication.currentUser();

        if ($scope.isLoggedIn) {
            $scope.myUsername = $scope.currentUser.username;
        }

        $scope.logout = function() {
            authentication.logout();
            $location.path('/'); //redirect to homepage
        };

        //***********************************
        
        //5 most popular tags:
        $scope.tags = [];
        //peopleService delivers a promise we resolve in the controllers.

        tagService.tags().then(function success(response) {
            var x = response.data;
            console.log(x);
            $scope.tags = x;
        });
    }
})
