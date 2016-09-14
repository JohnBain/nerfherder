//really no reason to do it this way other than to demonstrate that there's multiple ways of handling 
//services in Angular, which could have more efficacy in other situations 


//These must be refactored to use '.then'
(function() {
    angular
        .module('datingApp')
        .service('authentication', authentication);

    authentication.$inject = ['$window', '$http'];


    function authentication($window, $http) {

        var saveToken = function(token) {
            $window.localStorage['token'] = token;
        };

        var getToken = function() {
            return $window.localStorage['token'];
        };

        var register = function(user) {
            return $http({
                method: 'post',
                url: '/users/register',
                data: user
            })
        };

        var login = function(user) {
            return $http({
                method: 'post',
                url: '/users/login',
                data: user
            })
        };

        //these will return a promise holding the user data (JWT payload, not the actual user object from db), 
        //which has a .token property we can use for auth

        var logout = function() {
            $window.localStorage.removeItem('token')
        };

        var isLoggedIn = function() {
            var token = getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000; //return false if expiry date has passed
            } else {
                //no token, GTFO kid
                return false;
            }
        };

        var currentUser = function() {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                console.log(token);
                console.log(payload);
                return {
                    email: payload.email,
                    username: payload.username
                }
            }
        };

        return {
            saveToken: saveToken,
            getToken: getToken,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser
        }

    }

    /*var currentUser = function() 
{        if (isLoggedIn()) {
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
                //this could be modified to return the whole user object from db
                email: payload.email
                username: payload.username
            };
        }
    };*/



})();
