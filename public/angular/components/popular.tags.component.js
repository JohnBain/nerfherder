angular.module('datingApp').component('popularTags', {
        templateUrl: '/public/templates/populartags.html',

        controller: function populateTags($scope, tagService) {
            $scope.tags = [];
            //peopleService delivers a promise we resolve in the controllers.

            tagService.tags().then(function success(response) {
                var x = response.data;
                console.log(x);
                $scope.tags = x;
            });
        }
    })