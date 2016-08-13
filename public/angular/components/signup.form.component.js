angular.module('datingApp').component('signupForm', {
    templateUrl: '/public/templates/signup.html',
    controller: function signupCtrl($scope, $http, saveUser) {
        //using an immediate function to generate ages 18-99
        $scope.ages = (function() {
            var arr = [];
            for (i = 18; i <= 99; i++) {
                arr.push(i);
            }
            return arr
        }());

        $scope.formInfo = {};


        $scope.saveData = function() {
            $scope.nameRequired = '';
            $scope.passwordRequired = '';
            $scope.ageRequired = '';
            $scope.genderRequired = '';
            var lat = $scope.details.geometry.location.lat()
            var long = $scope.details.geometry.location.lng()
            $scope.formInfo.img_resources = ["public/images/woman1.jpg"];
            $scope.formInfo.location_info = { lat: lat, long: long }

            /*var myTags = $scope.formInfo.tags.split(",").map(t => t = t.trim())*/


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
            var ary = [];
            ary.push(x.tags);
            x.tags = ary;


            console.log(x);
            var req = {
                method: 'POST',
                url: '/users/signup',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: x
            }
            $http.defaults.transformResponse = [];
            $http(req).then(function() { console.log("user saved") }, function() { console.log("failure") });

            /*}*/

        };

    }
})
