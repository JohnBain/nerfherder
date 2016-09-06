angular.module('datingApp', ['core', 'datingApp.services', 'ngResource', 'ngAutocomplete', 'ui.router', 'autocomplete', 'ui.bootstrap'])

.config(function($stateProvider) {

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
    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);

});
