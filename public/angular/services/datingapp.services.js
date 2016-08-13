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

datingModule.factory('tagService', function($http){
    var tagList = function(){
        return $http({
            method: 'GET',
            url: '/users/tags/fiverandom'
        })
    };
    return {
        tags: function() {
            return tagList();
        }
    }
});


datingModule.factory('oneUser', function($resource) {
  return $resource('/users/:username'); // Note the full endpoint address
});

//since services are lazily instantiated it's not a big deal that I have so many

datingModule.factory('saveUser', function($resource) {
  return $resource('/users/signup'); 
});

