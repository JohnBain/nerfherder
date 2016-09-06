angular.module('datingApp', ['core', 'datingApp.services', 'ngResource', 'ngAutocomplete', 'ui.router', 'autocomplete'])

.config(function($stateProvider) {

    var modalState = {
        name: 'modal',
        views: {
            "modal": {
                templateUrl: "modals/modal.html"
            }
        },
        abstract: true
    };

    modalState.login = {
        views: {
            "modal": {
                templateUrl: "modals/login.html"
            }
        }
    };


    var signupState = {
        name: 'signup',
        url: '/signup',
        template: '<popular-tags></popular-tags><signup-form></signup-form>'
    };

    var homeState = {
        name: 'home',
        url: '/',
        template: '<popular-tags></popular-tags><people-list></people-list>'
    };

    var helloState = {
        name: 'hello',
        url: '/hello',
        template: '<h3>hello world!</h3>'
    };

    var aboutState = {
        name: 'about',
        url: '/about',
        template: '<h3>Its the UI-Router hello world app!</h3>'
    };

    $stateProvider.state(homeState);
    $stateProvider.state(signupState);
    $stateProvider.state(modalState);
    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
});
