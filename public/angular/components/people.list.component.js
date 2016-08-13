    //a component is an Angular 1.5 feature
    //component is just a wrapper around directives with good defaults


    angular.module('datingApp').component('peopleList', {
        templateUrl: '/public/templates/peoplelist.html',
        controller: function populatePeopleController($scope, peopleService) {
            var that = this;
            peopleService.users().then(function success(response) {
                    that.people = response.data;
                })
                //that.people will be undefined if we try to log it here (due to asynchronicity), but this works
        }
    })
