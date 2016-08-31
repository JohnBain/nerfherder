angular.module('datingApp', ['core', 'datingApp.services', 'ngResource', 'ngAutocomplete', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            template: '<p>hello world</p>'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            template: '<h1> HELLO WORLD </h1>'
        });
        
});

