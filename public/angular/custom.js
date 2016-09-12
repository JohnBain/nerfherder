angular.module('datingApp', ['core', 'datingApp.services', 'ngResource', 'ngAutocomplete', 'ui.router', 'autocomplete', 'ui.bootstrap'])

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

    var signupState = {
        name: 'signup',
        url: '/signup',
        //not ideal since this should be componentized in Angular 1.5, but good enough
        template: '<popular-tags></popular-tags><signup-form></signup-form>'
    };

    var homeState = {
        name: 'home',
        url: '/',
        template: '<popular-tags></popular-tags><people-list></people-list>'
    };

    var aboutState = {
        name: 'about',
        url: '/about',
        template: '<h3>Welcome to the about page,{{ user }} </h3>',
        //just a small demonstration of resolves. Resolve (re)loads data on state (re)load.
        resolve: {
            user: function($stateParams) {
                $stateParams.user = "Me";
            }
        },
        controller: function($scope, $stateParams) {
            console.log($stateParams.user);
            $scope.user = $stateParams.user;
        }
    };

    var profileState = {
        name: 'profile',
        url: '/profile/{username}',
        templateUrl: '/public/templates/profile.html',
        resolve: {
            user: function(oneUser, $stateParams) {
                oneUser.get({ username: $stateParams.username }, function(succ) {
                    $stateParams.user = succ;
                })
            }
        },
        controller: function($scope, $stateParams) {
            $scope.user = $stateParams.user;
        }
    };

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    //usually we'd use an array with .forEach but not a big deal in a small app like this
    $stateProvider.state(homeState);
    $stateProvider.state(signupState);
    $stateProvider.state(aboutState);
    $stateProvider.state(profileState);



});
