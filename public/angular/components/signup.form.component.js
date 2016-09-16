angular.module('datingApp').component('signupForm', {
    templateUrl: '/public/templates/signup.html',
    controller: function signupCtrl($scope, $window, $location, authentication) {
        //using an immediate function to generate ages 18-99
        $scope.ages = (function() {
            var arr = [];
            for (i = 18; i <= 99; i++) {
                arr.push(i);
            }
            return arr
        }());

        $scope.genders = (function() {
            return ['M', 'F']; //weird bug, if I declare this as a simple array it whites out when I first select
        }());

        $scope

        $scope.formInfo = {};
        $scope.errMessage = '';

        $scope.formInfo.tags = ["star wars", "swimming", "pizza", "video games"];
        $scope.formInfo.img_resources = ["/public/images/man2.jpg"];


        $scope.returnPage = $location.search().page || '/';

        $scope.saveData = function() {
            $scope.nameRequired = '';
            $scope.passwordRequired = '';
            $scope.ageRequired = '';
            $scope.genderRequired = '';
            $scope.emailRequired = '';
            //$scope.formInfo.location_info = { lat: $scope.details.geometry.location.lat(), long: $scope.details.geometry.location.lng() };
            /*$scope.myTags = $scope.formInfo.tags.split(",").map(t => t = t.trim())*/

            if (!$scope.formInfo.name) {
                $scope.nameRequired = 'Username Required';
            } else if ($scope.formInfo.Name.length < 3) {
                $scope.nameRequired = 'Username Must Be At Least 3 Characters';
            }

            if (!$scope.formInfo.password) {
                $scope.passwordRequired = 'Password Required';
            }

            if (!$scope.formInfo.age) {
                $scope.ageRequired = 'Age Required';
            }

            if (!$scope.formInfo.gender) {
                $scope.genderRequired = 'Gender Required';
            }


            /*if ($scope.formInfo.location) {*/
            var x = $scope.formInfo;
            if (x.gender === 'M'){
                x.img_resources = ["public/images/man2.jpg"];
            }
            else {
                x.img_resources = ["public/images/woman1.jpg"];
            }

            console.log(x);

            authentication.register(x).then(function(data) {
                authentication.saveToken(data.data.token);
                /*console.log(data.data);
                console.log($window.localStorage);*/
                /*console.log("user saved. user data: " + JSON.stringify(data));*/
                //JSON.stringify(x) helps you figure out what [object Object] is
                $location.search('page', null);
                $location.path($scope.returnPage);

            }, function() {
                console.log("failure")
                $scope.errMessage = "Something went wrong";
            });

            /*}*/

        };

    }
})
