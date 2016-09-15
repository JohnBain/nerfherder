angular.module('datingApp').component('popularTags', {
    templateUrl: '/public/templates/populartags.html',

    controller: function populateTags($scope, ModalService, authentication, tagService) {
        //*******Authentication buttons******
        $scope.isLoggedIn = authentication.isLoggedIn();
        $scope.currentUser = authentication.currentUser();
        $scope.yesNoResult = '';

        if ($scope.isLoggedIn) {
            $scope.myUsername = $scope.currentUser.username;
        }

        $scope.showStuff = function() {
            console.log($scope.yesNoResult)
        }

        $scope.logout = function() {
            authentication.logout();
            $scope.isLoggedIn = false;
            $location.path('/'); //redirect to homepage
        };

        //***********Login modal*************

        $scope.loginModal = function() {

            ModalService.showModal({
                templateUrl: "/public/templates/loginmodal.html",
                controller: "loginModal"
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    $scope.yesNoResult = result ? "You said Yes" : "You said No";
                    //prototypical inheritance
                });
            });

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