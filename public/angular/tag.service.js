var datingModule = angular.module('datingApp.services', []);

//defining a service that delivers a promise with a list of users.
//we could simply call $http (a built-in service) in each controller
//but this is nicer since we'll need to access our user list from multiple controllers. 

datingModule.factory('peopleService', function($http) {
    var userList = function() {
        return $http({
            method: 'GET',
            url: '/users'
        })
    };

    return {
        users: function() {
            return userList();
        }
    };
});

//defining a service which depends on our peopleService that returns a list of tags
//aborted, but keeping code to show how to include a dependency on another service

datingModule.factory('tagService', ['peopleService', function(peopleService) {
    var getTags = function(callbackFn){
    	peopleService.users().success(function(data){
    		callbackFn(data)
    	})
    };

    return {
    	getTags: getTags
    }

}]);

