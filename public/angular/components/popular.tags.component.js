angular.module('datingApp').component('popularTags', {
    templateUrl: '/public/templates/populartags.html',

    controller: function populateTags($scope, ModalService, authentication, tagService) {

        //*******authentication buttons******
        $scope.isLoggedIn = authentication.isLoggedIn();
        $scope.currentUser = authentication.currentUser();

        if ($scope.isLoggedIn) {
            $scope.myUsername = $scope.currentUser.username;
        }

        $scope.logout = function() {
            authentication.logout();
            $scope.isLoggedIn = false;
            $location.path('/'); //redirect to homepage
        };


        //***********Login modal*************

        $scope.modal = function() {
            ModalService.showModal({
                templateUrl: '/public/templates/loginmodal.html',
                controller: function ModalController($scope) {
                    $scope.close = function(result) {
                        close(result, 500); // close, but give 500ms for bootstrap to animate
                    };

                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    $scope.message = "You said " + result;
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
