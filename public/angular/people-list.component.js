    //a component is an Angular 1.5 feature
    //component is just a wrapper around directives with good defaults


    angular.
    module('datingApp', ['core', 'datingApp.services', 'ngResource']).
    component('peopleList', {
        templateUrl: '/public/templates/peoplelist.html',
        controller: function populatePeopleController($scope, peopleService) {
            var that = this;
            peopleService.users().then(function success(response) {
                    that.people = response.data;
                })
                //that.people will be undefined if we try to log it here (due to asynchronicity), but this works
        }
    }).
    component('popularTags', {
        templateUrl: '/public/templates/populartags.html',

        controller: function populateTags($scope, peopleService) {
            $scope.tags = [];
            //peopleService delivers a promise we resolve in the controllers.

            peopleService.users().then(function success(response) {
                var x = response.data;
                x.forEach(function(each) {
                    each['tags'].forEach(function(tag) {
                        //let's get the top 5 then a link to see all other tags on the site
                        if ($scope.tags.indexOf(tag) === -1)
                            $scope.tags.push(tag);
                    });
                });
            });
        }
    }).component('userProfile', {
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
    }).
    component('signupForm', {
        templateUrl: '/public/templates/signup.html',
        controller: function signupCtrl($scope) {
            //using an immediate function to generate ages 18-99
            $scope.ages = (function() {
                var arr = [];
                for (i = 18; i <= 99; i++) {
                    arr.push(i);
                }
                return arr
            }());

            $scope.formInfo = {};
            $scope.textfield = "";
            $scope.badLocation = "";
            $scope.goodLocation = "";

            var checkLoc = function(loc) {
                if (loc.length === 0) {
                    $scope.badLocation = "No location found"
                }
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ "address": $scope.textfield }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                        var location = results[0].geometry.location;
                        $scope.formInfo.Location = location

                    } else {
                        console.log(results, 'bad results', status, 'bad status');
                        $scope.badLocation = "Failed"
                    }
                })
            }


            var tellLoc = function(loc) {
                var geocoder = new google.maps.Geocoder();
                var latlng = $scope.formInfo.Location
                geocoder.geocode({ 'latLng': latlng }, function(results, status) {
                    console.log(results, 'here are results of reverse geocode')
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            $scope.goodLocation = results[1].formatted_address;
                            console.log($scope.goodLocation)
                        } else {
                            $scope.goodLocation = 'Location not found';
                        }
                    } else {
                        $scope.goodLocation = 'Geocoder failed due to: ' + status
                    }
                });
            }



            $scope.saveData = function() {
                $scope.nameRequired = '';
                $scope.passwordRequired = '';
                $scope.ageRequired = '';
                $scope.genderRequired = '';
                $scope.badLocation = '';


                checkLoc($scope.textfield);
                tellLoc($scope.textfield);

                if (!$scope.formInfo.Name) {
                    $scope.nameRequired = 'Username Required';
                } else if ($scope.formInfo.Name.length < 3) {
                    $scope.nameRequired = 'Username Must Be At Least 3 Characters';
                }

                if (!$scope.formInfo.Password) {
                    $scope.passwordRequired = 'Password Required';
                }

                if (!$scope.formInfo.Age) {
                    $scope.ageRequired = 'Age Required';
                }

                if (!$scope.formInfo.Gender) {
                    $scope.genderRequired = 'Gender Required';
                }

            };

        }
    })
